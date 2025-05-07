package pl.adoptme.adopt.me.user.account.activate.account.token;


import java.util.List;
import java.util.Optional;

public interface ActivateAccountTokenRepository {

    void save(ActivateAccountToken token);

    void deleteById(String id);

    List<ActivateAccountToken> getAll();

    Optional<ActivateAccountToken> getById(String id);
}
