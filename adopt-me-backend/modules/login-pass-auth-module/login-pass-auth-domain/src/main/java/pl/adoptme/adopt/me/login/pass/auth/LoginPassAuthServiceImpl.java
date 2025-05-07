package pl.adoptme.adopt.me.login.pass.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.ActivityService;
import pl.adoptme.adopt.me.activities.form.FailLoginForm;
import pl.adoptme.adopt.me.activities.form.SuccessLoginForm;
import pl.adoptme.adopt.me.gmail.auth.domain.GmailAuthService;
import pl.adoptme.adopt.me.gmail.auth.domain.GmailUserProfile;
import pl.adoptme.adopt.me.login.pass.auth.form.*;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.PasswordResetToken;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.PasswordResetTokenConfig;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.PasswordResetTokenRepository;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.PasswordResetForm;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.PasswordResetNotificationForm;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.TokenValidationForm;
import pl.adoptme.adopt.me.login.pass.auth.response.LoginResponse;
import pl.adoptme.adopt.me.login.pass.auth.response.UserAuthTypeResponse;
import pl.adoptme.adopt.me.notification.NotificationService;
import pl.adoptme.adopt.me.notification.dto.NotificationForm;
import pl.adoptme.adopt.me.notification.dto.ResetPasswordForm;
import pl.adoptme.adopt.me.security.SecurityService;
import pl.adoptme.adopt.me.user.account.UserAccount;
import pl.adoptme.adopt.me.user.account.UserAccountService;
import pl.adoptme.adopt.me.user.account.activate.account.token.form.ActivateAccountNotificationForm;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.FrontendConfig;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static pl.adoptme.adopt.me.user.account.UserAccountStatus.ACTIVE;
import static pl.adoptme.adopt.me.user.account.UserAccountStatus.DELETED;
import static pl.adoptme.adoptme.common.domain.ErrorCode.*;

@Service
@RequiredArgsConstructor
class LoginPassAuthServiceImpl implements LoginPassAuthService {

    private final LoginPassAuthRepository loginPassAuthRepository;
    private final UserAccountService userAccountService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordResetTokenConfig passwordResetTokenConfig;
    private final SecurityService securityService;
    private final NotificationService notificationService;
    private final FrontendConfig frontendConfig;
    private final ActivityService activityService;
    private final GmailAuthService gmailAuthService;

    @Override
    public void register(RegisterForm form) {
        UserAccount userAccount = userAccountService.save(form, "SYSTEM");
        String encodedPassword = securityService.encodePassword(form.getPassword());

        loginPassAuthRepository.save(LoginPassAuthUser.builder()
                .id(userAccount.getId())
                .password(encodedPassword)
                .build());

        ActivateAccountNotificationForm notificationForm = ActivateAccountNotificationForm.builder()
                .email(userAccount.getEmail()).build();
        userAccountService.sendNotificationToActiveAccount(notificationForm);
    }

    @Override
    public LoginResponse login(LoginForm form) {
        UserAccount userAccount;
        LoginPassAuthUser loginPassAuthUser;
        try {
            userAccount = userAccountService.getByEmail(form.getEmail());
            loginPassAuthUser = loginPassAuthRepository.getById(userAccount.getId())
                    .orElseThrow(() -> new ApplicationException(USER_NOT_FOUND_EXCEPTION));
        } catch (ApplicationException exception) {
            throw new ApplicationException(AUTHENTICATION_EXCEPTION);
        }

        if (userAccount.getStatus().equals(DELETED)) {
            throw new ApplicationException(AUTHENTICATION_EXCEPTION);
        }

        if (!userAccount.getStatus().equals(ACTIVE)) {
            throw new ApplicationException(USER_ACCOUNT_NOT_ACTIVATED_EXCEPTION);
        }

        UserAuthTypeForm userAuthTypeForm = new UserAuthTypeForm(form.getEmail());
        UserAuthTypeResponse authTypeResponse = authenticatesWithLoginPass(userAuthTypeForm);
        if (!authTypeResponse.isAuthWithLoginPass()) {
            throw new ApplicationException(GMAIL_LOGIN_PASS_AUTH_DISABLED_EXCEPTION);
        }

        if (!securityService.passwordMatches(form.getPassword(), loginPassAuthUser.getPassword())) {
            activityService.save(new FailLoginForm(userAccount.getId(), userAccount.getEmail()));
            throw new ApplicationException(AUTHENTICATION_EXCEPTION);
        }

        String authToken = securityService.generateAuthToken(loginPassAuthUser.getId());
        activityService.save(new SuccessLoginForm(userAccount.getId(), userAccount.getEmail()));
        return LoginResponse.builder()
                .token(authToken)
                .build();
    }

    @Override
    public void setPasswordToGmailAccount(GmailUserPasswordForm form) {
        gmailAuthService.validateTokenId(form.getTokenId());
        GmailUserProfile gmailUserProfile = gmailAuthService.getUserProfileFromToken(form.getTokenId());
        UserAccount userAccount = userAccountService.getByEmail(gmailUserProfile.getEmail());
        String encodedPassword = securityService.encodePassword(form.getPassword());

        LoginPassAuthUser authUser = LoginPassAuthUser.builder()
                .id(userAccount.getId())
                .password(encodedPassword).build();
        loginPassAuthRepository.save(authUser);
    }

    @Override
    public UserAuthTypeResponse authenticatesWithLoginPass(UserAuthTypeForm form) {
        try {
            UserAccount userAccount = userAccountService.getByEmail(form.getEmail());
            Optional<LoginPassAuthUser> authUserOpt = loginPassAuthRepository.getById(userAccount.getId());
            return new UserAuthTypeResponse(authUserOpt.isPresent());
        } catch (Exception exception) {
            return new UserAuthTypeResponse(false);
        }
    }

    @Override
    public UserAuthTypeResponse gmailUserAuthenticatesWithLoginPass(GmailUserAuthTypeForm form) {
        gmailAuthService.validateTokenId(form.getTokenId());
        GmailUserProfile userProfile = gmailAuthService.getUserProfileFromToken(form.getTokenId());
        try {
            UserAccount userAccount = userAccountService.getByEmail(userProfile.getEmail());
            Optional<LoginPassAuthUser> authUserOpt = loginPassAuthRepository.getById(userAccount.getId());
            return new UserAuthTypeResponse(authUserOpt.isPresent());
        } catch (Exception exception) {
            return new UserAuthTypeResponse(false);
        }
    }

    @Override
    public void logoutSelf(String userId) {
        securityService.logoutSelf(userId);
    }

    @Override
    public void logoutUserById(String userId, String performedBy) {
        securityService.logoutUserById(userId, performedBy);
    }

    @Override
    public void resetPassword(PasswordResetForm form) {
        validateToken(new TokenValidationForm(form.getToken()));
        PasswordResetToken token = passwordResetTokenRepository.getById(form.getToken()).get();

        LoginPassAuthUser user = loginPassAuthRepository.getById(token.getUserId())
                .orElseGet(() -> new LoginPassAuthUser(token.getUserId(), null));

        String newEncodedPassword = securityService.encodePassword(form.getNewPassword());
        user.setPassword(newEncodedPassword);
        token.setUsed(true);

        loginPassAuthRepository.save(user);
        passwordResetTokenRepository.save(token);
    }

    @Override
    public void sendNotificationToResetPassword(PasswordResetNotificationForm form) {
        UserAccount userAccount = userAccountService.getByEmail(form.getEmail());
        LocalDateTime tokenExpirationDate = LocalDateTime.now().plusHours(
                passwordResetTokenConfig.getExpirationTime()
        );

        if (gmailAuthService.isUserAuthenticatedByGmail(userAccount.getId())) {
            throw new ApplicationException(PASSWORD_RESET_GMAIL_AUTH_EXCEPTION);
        }

        PasswordResetToken generatedToken = PasswordResetToken.builder()
                .id(UUID.randomUUID().toString())
                .expirationDate(tokenExpirationDate)
                .userId(userAccount.getId())
                .used(false)
                .build();

        passwordResetTokenRepository.save(generatedToken);
        String passwordResetUrl = frontendConfig.getPasswordResetUrl() + "/" + generatedToken.getId();
        NotificationForm notificationForm = new ResetPasswordForm(
                userAccount.getEmail(),
                userAccount.getFirstName(),
                userAccount.getLastName(),
                passwordResetUrl
        );
        notificationService.send(notificationForm, userAccount.getId());
    }

    @Override
    public void validateToken(TokenValidationForm form) {
        PasswordResetToken token = passwordResetTokenRepository.getById(form.getToken())
                .orElseThrow(() -> new ApplicationException(PASSWORD_RESET_TOKEN_NOT_FOUND_EXCEPTION));

        if (token.isUsed()) {
            throw new ApplicationException(PASSWORD_RESET_TOKEN_ALREADY_USED_EXCEPTION);
        }

        LocalDateTime now = LocalDateTime.now();
        if (now.isAfter(token.getExpirationDate())) {
            throw new ApplicationException(PASSWORD_RESET_TOKEN_EXPIRED_EXCEPTION);
        }
    }

    @Override
    public void changeSelfPassword(ChangeSelfPasswordForm form, String userId) {
        Optional<LoginPassAuthUser> authUserOpt = loginPassAuthRepository.getById(userId);
        if (authUserOpt.isEmpty()) {
            throw new ApplicationException(LOGGED_USER_NOT_FOUND_EXCEPTION);
        }

        LoginPassAuthUser authUser = authUserOpt.get();
        boolean passwordMatches = securityService.passwordMatches(
                form.getCurrentPassword(),
                authUser.getPassword()
        );

        if (!passwordMatches) {
            throw new ApplicationException(INVALID_CURRENT_PASSWORD_EXCEPTION);
        }

        String newEncodedPassword = securityService.encodePassword(form.getNewPassword());
        authUser.setPassword(newEncodedPassword);
        loginPassAuthRepository.save(authUser);
    }

    @Override
    public void changeUserPassword(ChangeUserPasswordForm form) {
        LoginPassAuthUser authUser;
        Optional<LoginPassAuthUser> authUserOpt = loginPassAuthRepository.getById(form.getUserId());
        boolean authByGmail = gmailAuthService.isUserAuthenticatedByGmail(form.getUserId());

        if (authUserOpt.isEmpty() && authByGmail) {
            authUser = LoginPassAuthUser.builder()
                    .id(form.getUserId())
                    .build();
        } else {
            authUser = authUserOpt.get();
        }

        String encodedNewPassword = securityService.encodePassword(form.getNewPassword());
        authUser.setPassword(encodedNewPassword);
        loginPassAuthRepository.save(authUser);
    }
}

