package pl.adoptme.adopt.me.login.pass.auth.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponse {
    private String token;
}

