package pl.adoptme.adopt.me.security.white.list;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class WhiteListToken {
    private String tokenId;
    private String userId;
}
