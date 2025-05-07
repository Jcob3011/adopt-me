package pl.adoptme.adopt.me.gmail.auth.infrastructure;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GmailAuthUserRepositoryJpa extends JpaRepository<GmailAuthUserEntity, String> {

    Optional<GmailAuthUserEntity> findByUserId(String userId);
}
