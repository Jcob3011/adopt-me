package pl.adoptme.adopt.me.login.pass.auth;


public class LoginPassAuthEntityMapper {

    public static LoginPassAuthEntity createLoginPassAuthEntity(LoginPassAuthUser loginPassAuthUser) {
        return LoginPassAuthEntity.builder()
                .id(loginPassAuthUser.getId())
                .password(loginPassAuthUser.getPassword())
                .build();
    }

    public static LoginPassAuthUser mapToLoginPassAuthUser(LoginPassAuthEntity loginPassAuthEntity) {
        return LoginPassAuthUser.builder()
                .id(loginPassAuthEntity.getId())
                .password(loginPassAuthEntity.getPassword())
                .build();
    }
}

