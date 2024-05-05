package pl.adoptme.adopt.me.login.pass.auth;


import java.util.Optional;

interface LoginPassAuthRepository {
    void save(LoginPassAuthUser loginPassAuthUser);

    Optional<LoginPassAuthUser> getById(String id);
}
