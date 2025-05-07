package pl.adoptme.adopt.me.login.pass.auth;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "login_pass_auth")
public class LoginPassAuthEntity {
    @Id
    private String id;
    private String password;
}
