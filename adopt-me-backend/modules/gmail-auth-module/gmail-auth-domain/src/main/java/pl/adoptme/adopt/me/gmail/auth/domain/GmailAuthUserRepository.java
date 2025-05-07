package pl.adoptme.adopt.me.gmail.auth.domain;


import java.util.Optional;

public interface GmailAuthUserRepository {

    Optional<GmailAuthUser> getById(String id);

    boolean existsById(String id);

    boolean existsByUserId(String userId);

    GmailAuthUser save(GmailAuthUser gmailAuthUser);
}
