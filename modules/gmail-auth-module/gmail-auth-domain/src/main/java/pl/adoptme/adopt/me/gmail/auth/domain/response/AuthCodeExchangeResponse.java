package pl.adoptme.adopt.me.gmail.auth.domain.response;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthCodeExchangeResponse {
    private String accessToken;
    private String tokenId;
}
