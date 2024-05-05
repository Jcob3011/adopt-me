package pl.adoptme.adopt.me.login.pass.auth;


import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginPassAuthUser {
    private String id;
    private String password;
}

