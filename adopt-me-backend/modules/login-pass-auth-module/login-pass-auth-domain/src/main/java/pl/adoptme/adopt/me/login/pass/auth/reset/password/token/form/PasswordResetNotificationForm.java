package pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordResetNotificationForm {

    @NotBlank(message = "{validation.empty}")
    private String email;
}
