package pl.adoptme.adopt.me.login.pass.auth.reset.password.token;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepositoryJpa extends JpaRepository<PasswordResetTokenEntity, String> {
}
