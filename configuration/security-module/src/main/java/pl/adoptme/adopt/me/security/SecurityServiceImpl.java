package pl.adoptme.adopt.me.security;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.security.jwt.JwtAuthUser;
import pl.adoptme.adopt.me.security.white.list.AuthTokenWhiteList;
import pl.adoptme.adopt.me.security.white.list.AuthTokenWhiteListConfig;
import pl.adoptme.adopt.me.security.white.list.WhiteListToken;
import pl.adoptme.adopt.me.user.account.UserAccount;
import pl.adoptme.adopt.me.user.account.UserAccountService;
import pl.adoptme.adoptme.common.domain.ApplicationException;

import java.util.UUID;

import static pl.adoptme.adopt.me.user.account.UserAccountRole.ADMIN;
import static pl.adoptme.adopt.me.user.account.UserAccountStatus.ACTIVE;
import static pl.adoptme.adopt.me.user.account.UserAccountStatus.INACTIVE;
import static pl.adoptme.adoptme.common.domain.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class SecurityServiceImpl implements SecurityService, UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserAccountService userAccountService;
    private final AuthTokenWhiteList whiteList;
    private final AuthTokenWhiteListConfig whiteListConfig;
    private final Algorithm algorithm;

    @Override
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    @Override
    public boolean passwordMatches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    @Override
    public void validateAuthToken(String token) {
        try {
            DecodedJWT decodedJWT = JWT.require(algorithm).build().verify(token);
            UserAccount userAccount = userAccountService.get(decodedJWT.getSubject());

            if (!userAccount.getStatus().equals(ACTIVE)) {
                throw new ApplicationException(JWT_TOKEN_INVALID_USER_STATUS_EXCEPTION);
            }

        } catch (JWTVerificationException exception) {
            throw new ApplicationException(JWT_TOKEN_VERIFICATION_EXCEPTION);
        }
    }

    @Override
    public String generateAuthToken(String userId) {
        WhiteListToken whiteListToken = WhiteListToken.builder()
                .tokenId(UUID.randomUUID().toString())
                .userId(userId)
                .build();
        whiteList.saveToken(whiteListToken);

        return JWT.create()
                .withSubject(userId)
                .withClaim("tokenId", whiteListToken.getTokenId())
                .sign(algorithm);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserAccount userAccount = userAccountService.get(username);
        return JwtAuthUser.builder()
                .id(username)
                .locked(userAccount.getStatus().equals(INACTIVE))
                .build();
    }

    @Override
    public void logoutSelf(String userId) {
        if (whiteListConfig.isEnabled()) {
            if (userId == null) {
                throw new ApplicationException(USER_NOT_FOUND_EXCEPTION);
            }
            whiteList.deleteByUserId(userId);
        }
    }

    @Override
    public void logoutUserById(String userId, String performedBy) {
        UserAccount userAccount = userAccountService.get(performedBy);
        if(!userAccount.getRole().equals(ADMIN)) {
            throw new ApplicationException(INEFFICIENT_LOGOUT_PRIVILEGES_EXCEPTION);
        }

        if (whiteListConfig.isEnabled()) {
            if (userId == null) {
                throw new ApplicationException(USER_NOT_FOUND_EXCEPTION);
            }
            whiteList.deleteByUserId(userId);
        }
    }

    @Override
    public void validateWhiteListToken(String tokenId, String userId) {
        if (whiteListConfig.isEnabled()) {
            if (whiteList.getByTokenId(tokenId).isEmpty()) {
                throw new ApplicationException(WHITE_LIST_TOKEN_NOT_FOUND_EXCEPTION);
            }
        }
    }
}

