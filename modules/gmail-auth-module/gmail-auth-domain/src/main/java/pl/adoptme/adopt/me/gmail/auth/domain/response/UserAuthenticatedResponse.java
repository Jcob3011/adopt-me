package pl.adoptme.adopt.me.gmail.auth.domain.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAuthenticatedResponse {
    private boolean authenticated;
}
