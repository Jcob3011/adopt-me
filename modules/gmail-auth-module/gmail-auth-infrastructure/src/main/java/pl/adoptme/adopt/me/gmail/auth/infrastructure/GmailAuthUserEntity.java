package pl.adoptme.adopt.me.gmail.auth.infrastructure;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "gmail_auth_user")
public class GmailAuthUserEntity {
    @Id
    private String gmailId;
    private String userId;
}

