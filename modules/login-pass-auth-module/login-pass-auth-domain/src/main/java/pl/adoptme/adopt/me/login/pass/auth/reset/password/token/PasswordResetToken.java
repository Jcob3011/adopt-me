package pl.adoptme.adopt.me.login.pass.auth.reset.password.token;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class PasswordResetToken {
    private String id;
    private String userId;
    private LocalDateTime expirationDate;
    private boolean used;
}
