package pl.adoptme.adopt.me.login.pass.auth.reset.password.token;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class PasswordResetTokenMapper {

    private final PasswordResetTokenConfig resetPasswordTokenConfig;

    public PasswordResetTokenEntity createResetPasswordTokenEntity(PasswordResetToken resetPasswordToken) {
        LocalDateTime tokenExpirationDate = LocalDateTime.now()
                .plusHours(resetPasswordTokenConfig.getExpirationTime());

        return PasswordResetTokenEntity.builder()
                .id(resetPasswordToken.getId())
                .userId(resetPasswordToken.getUserId())
                .expirationDate(tokenExpirationDate)
                .used(resetPasswordToken.isUsed())
                .build();
    }

    public PasswordResetToken mapToResetPasswordToken(PasswordResetTokenEntity resetPasswordTokenEntity) {
        return PasswordResetToken.builder()
                .id(resetPasswordTokenEntity.getId())
                .userId(resetPasswordTokenEntity.getUserId())
                .expirationDate(resetPasswordTokenEntity.getExpirationDate())
                .used(resetPasswordTokenEntity.isUsed())
                .build();
    }
}

