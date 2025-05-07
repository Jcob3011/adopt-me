package pl.adoptme.adopt.me.login.pass.auth.reset.password.token;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Repository
@RequiredArgsConstructor
public class PasswordResetRepositoryImpl implements PasswordResetTokenRepository {

    private final PasswordResetTokenRepositoryJpa resetPasswordTokenRepositoryJpa;
    private final PasswordResetTokenMapper resetPasswordTokenMapper;

    @Override
    public void save(PasswordResetToken token) {
        resetPasswordTokenRepositoryJpa.save(
                resetPasswordTokenMapper.createResetPasswordTokenEntity(token)
        );
    }

    @Override
    public void deleteById(String id) {
        resetPasswordTokenRepositoryJpa.deleteById(id);
    }

    @Override
    public List<PasswordResetToken> getAll() {
        return resetPasswordTokenRepositoryJpa.findAll().stream()
                .map(resetPasswordTokenMapper::mapToResetPasswordToken)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PasswordResetToken> getById(String id) {
        return resetPasswordTokenRepositoryJpa.findById(id)
                .map(resetPasswordTokenMapper::mapToResetPasswordToken);
    }
}
