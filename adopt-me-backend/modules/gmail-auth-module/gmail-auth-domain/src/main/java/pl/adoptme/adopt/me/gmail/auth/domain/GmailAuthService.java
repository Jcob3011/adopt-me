package pl.adoptme.adopt.me.gmail.auth.domain;


import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.gmail.auth.domain.form.GmailAuthForm;
import pl.adoptme.adopt.me.gmail.auth.domain.form.GmailAuthorizationCodeForm;
import pl.adoptme.adopt.me.gmail.auth.domain.response.AuthCodeExchangeResponse;
import pl.adoptme.adopt.me.gmail.auth.domain.response.UserAuthenticatedResponse;


@Validated
public interface GmailAuthService {

    String prepareAuthUrl();

    String authenticate(@Valid GmailAuthForm form);

    GmailUserProfile getUserProfileFromToken(String tokenId);

    AuthCodeExchangeResponse exchangeAuthCode(@Valid GmailAuthorizationCodeForm form);

    UserAuthenticatedResponse didUserAuthenticateByGmail(@Valid GmailAuthForm form);

    boolean isUserAuthenticatedByGmail(String userId);

    void validateTokenId(String tokenId);
}