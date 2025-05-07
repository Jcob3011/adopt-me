package pl.adoptme.adopt.me.login.pass.auth.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAuthTypeResponse {
    private boolean authWithLoginPass;
}