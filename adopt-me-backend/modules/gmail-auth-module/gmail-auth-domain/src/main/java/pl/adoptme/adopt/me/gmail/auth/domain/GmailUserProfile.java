package pl.adoptme.adopt.me.gmail.auth.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GmailUserProfile {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private boolean emailVerified;
    private String pictureUrl;
    private String domain;
}
