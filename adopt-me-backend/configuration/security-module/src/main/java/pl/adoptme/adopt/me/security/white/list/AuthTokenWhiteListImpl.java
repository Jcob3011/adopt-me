package pl.adoptme.adopt.me.security.white.list;


import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class AuthTokenWhiteListImpl implements AuthTokenWhiteList {

    private final Set<WhiteListToken> whiteListTokens = new HashSet<>();

    @Override
    public Optional<WhiteListToken> getByTokenId(String tokenId) {
        return whiteListTokens.stream()
                .filter(whiteListToken -> whiteListToken.getTokenId().equals(tokenId))
                .findFirst();
    }

    @Override
    public void saveToken(WhiteListToken token) {
        whiteListTokens.add(token);
    }

    @Override
    public void deleteByUserId(String userId) {
        List<WhiteListToken> tokensToRemove = whiteListTokens.stream()
                .filter(whiteListToken -> whiteListToken.getUserId().equals(userId))
                .toList();
        tokensToRemove.forEach(whiteListTokens::remove);
    }
}
