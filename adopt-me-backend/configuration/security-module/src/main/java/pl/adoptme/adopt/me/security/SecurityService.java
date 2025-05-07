package pl.adoptme.adopt.me.security;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface SecurityService {

    String encodePassword(String password);

    boolean passwordMatches(String rawPassword, String encodedPassword);

    String generateAuthToken(String userId);

    void validateAuthToken(String token);

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

    void logoutSelf(String userId);

    void logoutUserById(String userId, String performedBy);

    void validateWhiteListToken(String tokenId, String userId);
}
