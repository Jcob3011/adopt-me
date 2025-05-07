package pl.adoptme.adopt.me.gmail.auth.domain;


import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.Claim;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.ActivityService;
import pl.adoptme.adopt.me.activities.form.SuccessLoginForm;
import pl.adoptme.adopt.me.gmail.auth.domain.form.GmailAuthForm;
import pl.adoptme.adopt.me.gmail.auth.domain.form.GmailAuthorizationCodeForm;
import pl.adoptme.adopt.me.gmail.auth.domain.http.client.GmailAuthHttpClient;
import pl.adoptme.adopt.me.gmail.auth.domain.http.client.response.GmailHttpClientResponse;
import pl.adoptme.adopt.me.gmail.auth.domain.response.AuthCodeExchangeResponse;
import pl.adoptme.adopt.me.gmail.auth.domain.response.UserAuthenticatedResponse;
import pl.adoptme.adopt.me.security.SecurityService;
import pl.adoptme.adopt.me.user.account.UserAccount;
import pl.adoptme.adopt.me.user.account.UserAccountService;
import pl.adoptme.adopt.me.user.account.form.UserAccountImage;
import pl.adoptme.adopt.me.user.account.form.UserAccountSaveForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountUpdateForm;
import pl.adoptme.adoptme.common.domain.ApplicationException;


import java.util.Base64;
import java.util.Map;
import java.util.Set;


import static pl.adoptme.adoptme.common.domain.ErrorCode.UNPRIVILEGED_GMAIL_DOMAIN_EXCEPTION;
import static pl.adoptme.adoptme.common.domain.image.ImageUtils.downloadImageFromUrl;





@Service
@RequiredArgsConstructor
public class GmailAuthServiceImpl implements GmailAuthService {

    private final GmailAuthConfig gmailAuthConfig;
    private final GmailAuthHttpClient gmailAuthHttpClient;
    private final UserAccountService userAccountService;
    private final SecurityService securityService;
    private final GmailAuthUserRepository gmailAuthUserRepository;
    private final ActivityService activityService;

    @Override
    public String prepareAuthUrl() {
        return gmailAuthConfig.getAuthUrl() +
                "?client_id=" + gmailAuthConfig.getClientId() +
                "&redirect_uri=" + gmailAuthConfig.getRedirectUrl() +
                "&scope=" + String.join(" ", gmailAuthConfig.getScopes()) +
                "&response_type=code";
    }

    @Override
    public String authenticate(GmailAuthForm form) {
        gmailAuthHttpClient.verifyTokenId(form.getTokenId());
        GmailUserProfile gmailUserProfile = getUserProfileFromToken(form.getTokenId());

        if (!gmailAuthUserRepository.existsById(gmailUserProfile.getId())) {
            byte[] attachmentContent = downloadAndSaveAttachment(gmailUserProfile.getPictureUrl());
            UserAccountImage userAccountImage = null;
            if (attachmentContent != null) {
                String imageBase64 = Base64.getEncoder().encodeToString(attachmentContent);
                userAccountImage = UserAccountImage.builder()
                        .name("google-image.png")
                        .imageBase64(imageBase64)
                        .build();
            }

            UserAccountSaveForm userSaveForm = UserAccountSaveForm.builder()
                    .email(gmailUserProfile.getEmail())
                    .firstName(gmailUserProfile.getFirstName())
                    .lastName(gmailUserProfile.getLastName())
                    .role("USER")
                    .attachment(userAccountImage)
                    .build();

            UserAccount userAccount = userAccountService.save(userSaveForm, "GMAIL");
            UserAccountUpdateForm userAccountUpdateForm = UserAccountUpdateForm.builder()
                    .firstName(userSaveForm.getFirstName())
                    .lastName(userSaveForm.getLastName())
                    .email(userSaveForm.getEmail())
                    .role(userSaveForm.getRole())
                    .attachmentId(userAccount.getAttachmentId())
                    .status("ACTIVE")
                    .build();
            userAccountService.updateUserById(userAccountUpdateForm, userAccount.getId());

            GmailAuthUser gmailAuthUser = GmailAuthUser.builder()
                    .gmailId(gmailUserProfile.getId())
                    .userId(userAccount.getId())
                    .build();
            gmailAuthUserRepository.save(gmailAuthUser);
        }
        GmailAuthUser gmailAuthUser = gmailAuthUserRepository.getById(gmailUserProfile.getId()).get();
        activityService.save(new SuccessLoginForm(gmailAuthUser.getUserId(), gmailUserProfile.getEmail()));
        return securityService.generateAuthToken(gmailAuthUser.getUserId());
    }

    @Override
    public GmailUserProfile getUserProfileFromToken(String tokenId) {
        Map<String, Claim> claims = JWT.decode(tokenId).getClaims();
        String email = claims.get("email").asString();
        String emailDomain = email.substring(email.indexOf('@') + 1);

        return GmailUserProfile.builder()
                .id(claims.get("sub").asString())
                .firstName(claims.get("given_name").asString())
                .lastName(claims.get("family_name").asString())
                .emailVerified(claims.get("email_verified").asBoolean())
                .pictureUrl(claims.get("picture").asString())
                .email(email)
                .domain(emailDomain)
                .build();
    }

    @Override
    public AuthCodeExchangeResponse exchangeAuthCode(GmailAuthorizationCodeForm form) {
        GmailHttpClientResponse response = gmailAuthHttpClient.sendAuthRequest(form.getCode());
        GmailUserProfile gmailUserProfile = getUserProfileFromToken(response.getIdToken());

        Set<String> privilegedDomains = gmailAuthConfig.getPrivilegedDomains();
        if (!privilegedDomains.contains(gmailUserProfile.getDomain())) {
            throw new ApplicationException(UNPRIVILEGED_GMAIL_DOMAIN_EXCEPTION);
        }

        return AuthCodeExchangeResponse.builder()
                .tokenId(response.getIdToken())
                .accessToken(response.getAccessToken())
                .build();
    }

    @Override
    public UserAuthenticatedResponse didUserAuthenticateByGmail(GmailAuthForm form) {
        try {
            gmailAuthHttpClient.verifyTokenId(form.getTokenId());
            GmailUserProfile gmailUserProfile = getUserProfileFromToken(form.getTokenId());
            UserAccount userAccount = userAccountService.getByEmail(gmailUserProfile.getEmail());
            if (!gmailAuthUserRepository.existsByUserId(userAccount.getId())) {
                return new UserAuthenticatedResponse(false);
            }
            return new UserAuthenticatedResponse(true);
        } catch (Exception exception) {
            return new UserAuthenticatedResponse(false);
        }
    }

    @Override
    public boolean isUserAuthenticatedByGmail(String userId) {
        return gmailAuthUserRepository.existsByUserId(userId);
    }

    @Override
    public void validateTokenId(String tokenId) {
        gmailAuthHttpClient.verifyTokenId(tokenId);
    }

    private byte[] downloadAndSaveAttachment(String attachmentUrl) {
        if (attachmentUrl != null) {
            try {
                return downloadImageFromUrl(attachmentUrl);
            }  catch (Exception ignored) {
                //log.error("Cannot download image");
            }
        }
        return null;
    }
}
