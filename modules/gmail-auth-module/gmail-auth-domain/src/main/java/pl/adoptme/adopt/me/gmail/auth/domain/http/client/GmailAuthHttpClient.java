package pl.adoptme.adopt.me.gmail.auth.domain.http.client;


import pl.adoptme.adopt.me.gmail.auth.domain.http.client.response.GmailHttpClientResponse;

public interface GmailAuthHttpClient {

    GmailHttpClientResponse sendAuthRequest(String authCode);

    void verifyTokenId(String tokenId);
}

