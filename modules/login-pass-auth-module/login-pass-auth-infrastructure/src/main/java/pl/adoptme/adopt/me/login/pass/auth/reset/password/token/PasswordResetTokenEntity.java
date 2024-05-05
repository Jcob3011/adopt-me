package pl.adoptme.adopt.me.login.pass.auth.reset.password.token;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "password_reset_token")
public class PasswordResetTokenEntity {
    @Id
    private String id;
    private String userId;
    private LocalDateTime expirationDate;
    private boolean used;
}
