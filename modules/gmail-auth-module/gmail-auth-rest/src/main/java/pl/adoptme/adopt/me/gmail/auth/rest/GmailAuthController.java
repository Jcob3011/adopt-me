package pl.adoptme.adopt.me.gmail.auth.rest;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.adoptme.adopt.me.gmail.auth.domain.GmailAuthService;
import pl.adoptme.adopt.me.gmail.auth.domain.form.GmailAuthForm;
import pl.adoptme.adopt.me.gmail.auth.domain.form.GmailAuthorizationCodeForm;
import pl.adoptme.adopt.me.gmail.auth.domain.response.AuthCodeExchangeResponse;
import pl.adoptme.adopt.me.gmail.auth.domain.response.UserAuthenticatedResponse;
import pl.adoptme.adopt.me.gmail.auth.rest.response.GmailAuthTokenResponse;
import pl.adoptme.adopt.me.gmail.auth.rest.response.RedirectUrlResponse;


@RestController
@RequestMapping("/auth/gmail")
@RequiredArgsConstructor
public class GmailAuthController {

    private final GmailAuthService gmailAuthService;

    @GetMapping("/get-auth-url")
    public RedirectUrlResponse getGmailAuthUrl() {
        String preparedAuthUrl = gmailAuthService.prepareAuthUrl();
        return new RedirectUrlResponse(preparedAuthUrl);
    }

    @PostMapping("/exchange-auth-code")
    public AuthCodeExchangeResponse exchangeAuthCode(@RequestBody GmailAuthorizationCodeForm form) {
        return gmailAuthService.exchangeAuthCode(form);
    }

    @PostMapping("/check-authentication")
    public UserAuthenticatedResponse didUserAuthenticateByGmail(@RequestBody GmailAuthForm form) {
        return gmailAuthService.didUserAuthenticateByGmail(form);
    }

    @PostMapping("/validate-token-id")
    public void validateTokenId(@RequestBody GmailAuthForm form) {
        gmailAuthService.validateTokenId(form.getTokenId());
    }

    @PostMapping
    public GmailAuthTokenResponse authenticate(@RequestBody GmailAuthForm form) {
        String generatedJwtToken = gmailAuthService.authenticate(form);
        return new GmailAuthTokenResponse(generatedJwtToken);
    }
}
