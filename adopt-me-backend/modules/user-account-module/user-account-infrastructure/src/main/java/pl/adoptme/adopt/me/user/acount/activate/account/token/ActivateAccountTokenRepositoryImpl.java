package pl.adoptme.adopt.me.user.acount.activate.account.token;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.adoptme.adopt.me.user.account.activate.account.token.ActivateAccountToken;
import pl.adoptme.adopt.me.user.account.activate.account.token.ActivateAccountTokenRepository;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.user.acount.activate.account.token.ActivateAccountTokenEntityMapper.createActivateAccountTokenEntity;


@Component
@RequiredArgsConstructor
public class ActivateAccountTokenRepositoryImpl implements ActivateAccountTokenRepository {

    private final ActivateAccountTokenRepositoryJpa activateAccountTokenRepositoryJpa;

    @Override
    public void save(ActivateAccountToken token) {
        activateAccountTokenRepositoryJpa.save(
                createActivateAccountTokenEntity(token)
        );
    }

    @Override
    public void deleteById(String id) {
        activateAccountTokenRepositoryJpa.deleteById(id);
    }

    @Override
    public List<ActivateAccountToken> getAll() {
        return activateAccountTokenRepositoryJpa.findAll().stream()
                .map(ActivateAccountTokenEntityMapper::mapToActivateAccountToken)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ActivateAccountToken> getById(String id) {
        return activateAccountTokenRepositoryJpa.findById(id)
                .map(ActivateAccountTokenEntityMapper::mapToActivateAccountToken);
    }
}
