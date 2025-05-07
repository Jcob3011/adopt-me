package pl.adoptme.adopt.me.security.white.list;


import java.util.Optional;

public interface AuthTokenWhiteList {

    Optional<WhiteListToken> getByTokenId(String tokenId);

    void saveToken(WhiteListToken token);

    void deleteByUserId(String userId);
}
