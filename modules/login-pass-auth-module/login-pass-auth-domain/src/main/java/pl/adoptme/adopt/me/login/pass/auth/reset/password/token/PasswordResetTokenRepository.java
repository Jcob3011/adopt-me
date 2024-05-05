package pl.adoptme.adopt.me.login.pass.auth.reset.password.token;


import java.util.List;
import java.util.Optional;

public interface PasswordResetTokenRepository {
    void save(PasswordResetToken token);

    void deleteById(String id);

    List<PasswordResetToken> getAll();

    Optional<PasswordResetToken> getById(String id);
}

