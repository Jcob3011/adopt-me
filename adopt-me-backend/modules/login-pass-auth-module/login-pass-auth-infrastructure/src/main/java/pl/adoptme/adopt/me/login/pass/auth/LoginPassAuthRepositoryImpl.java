package pl.adoptme.adopt.me.login.pass.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static pl.adoptme.adopt.me.login.pass.auth.LoginPassAuthEntityMapper.createLoginPassAuthEntity;


@Repository
@RequiredArgsConstructor
public class LoginPassAuthRepositoryImpl implements LoginPassAuthRepository {

    private final LoginPassAuthRepositoryJpa loginPassAuthRepositoryJpa;

    @Override
    public void save(LoginPassAuthUser loginPassAuthUser) {
        loginPassAuthRepositoryJpa.save(
                createLoginPassAuthEntity(loginPassAuthUser)
        );
    }

    @Override
    public Optional<LoginPassAuthUser> getById(String id) {
        return loginPassAuthRepositoryJpa.findById(id)
                .map(LoginPassAuthEntityMapper::mapToLoginPassAuthUser);
    }
}

