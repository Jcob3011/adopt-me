package pl.adoptme.adopt.me.gmail.auth.infrastructure.http.client;


import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.adoptme.adopt.me.gmail.auth.domain.GmailAuthConfig;
import pl.adoptme.adopt.me.gmail.auth.domain.http.client.GmailAuthHttpClient;
import pl.adoptme.adopt.me.gmail.auth.domain.http.client.response.GmailHttpClientResponse;
import pl.adoptme.adoptme.common.domain.ApplicationException;


import static java.util.Collections.singletonList;
import static pl.adoptme.adoptme.common.domain.ErrorCode.GMAIL_AUTHENTICATION_EXCEPTION;
import static pl.adoptme.adoptme.common.domain.ErrorCode.INVALID_GMAIL_TOKEN_ID_EXCEPTION;


@Component
@RequiredArgsConstructor
public class GmailAuthHttpClientImpl implements GmailAuthHttpClient {

    private final GmailAuthConfig gmailAuthConfig;

    @Override
    public GmailHttpClientResponse sendAuthRequest(String gmailAuthToken) {
        try {
            HttpTransport httpTransport = new NetHttpTransport();
            JsonFactory jsonFactory = new GsonFactory();

            GoogleAuthorizationCodeTokenRequest tokenRequest = new GoogleAuthorizationCodeTokenRequest(
                    httpTransport, jsonFactory,
                    gmailAuthConfig.getClientId(),
                    gmailAuthConfig.getClientSecret(),
                    gmailAuthToken,
                    gmailAuthConfig.getRedirectUrl()
            );

            GoogleTokenResponse tokenResponse = tokenRequest.execute();
            return GmailHttpClientResponse.builder()
                    .idToken(tokenResponse.getIdToken())
                    .accessToken(tokenResponse.getAccessToken())
                    .expiresIn(tokenResponse.getExpiresInSeconds().intValue())
                    .build();
        } catch (Exception exception) {
            throw new ApplicationException(GMAIL_AUTHENTICATION_EXCEPTION);
        }
    }

    @Override
    public void verifyTokenId(String tokenId) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    new GsonFactory())
                    .setAudience(singletonList(gmailAuthConfig.getClientId()))
                    .build();
            GoogleIdToken googleIdToken = verifier.verify(tokenId);
            if (googleIdToken == null) {
                throw new ApplicationException(INVALID_GMAIL_TOKEN_ID_EXCEPTION);
            }

            Object audience = googleIdToken.getPayload().getAudience();
            if (!audience.equals(gmailAuthConfig.getClientId())) {
                throw new ApplicationException(INVALID_GMAIL_TOKEN_ID_EXCEPTION);
            }
        } catch (Exception exception) {
            throw new ApplicationException(INVALID_GMAIL_TOKEN_ID_EXCEPTION);
        }
    }
}
