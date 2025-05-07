package pl.adoptme.adopt.me.login.pass.auth;


import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.login.pass.auth.form.*;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.PasswordResetForm;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.PasswordResetNotificationForm;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.TokenValidationForm;
import pl.adoptme.adopt.me.login.pass.auth.response.LoginResponse;
import pl.adoptme.adopt.me.login.pass.auth.response.UserAuthTypeResponse;
import pl.adoptme.adopt.me.login.pass.auth.form.ChangeSelfPasswordForm;

@Validated
public interface LoginPassAuthService {
    void register(@Valid RegisterForm form);

    LoginResponse login(@Valid LoginForm form);

    void setPasswordToGmailAccount(@Valid GmailUserPasswordForm form);

    UserAuthTypeResponse authenticatesWithLoginPass(@Valid UserAuthTypeForm form);

    UserAuthTypeResponse gmailUserAuthenticatesWithLoginPass(@Valid GmailUserAuthTypeForm form);

    void logoutSelf(String userId);

    void logoutUserById(String userId, String performedBy);

    void resetPassword(@Valid PasswordResetForm form);

    void sendNotificationToResetPassword(@Valid PasswordResetNotificationForm form);

    void validateToken(@Valid TokenValidationForm form);

    void changeSelfPassword(@Valid ChangeSelfPasswordForm form, String userId);

    void changeUserPassword(@Valid ChangeUserPasswordForm form);


}
