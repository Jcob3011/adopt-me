package pl.adoptme.adopt.me.login.pass.auth.form;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChangeUserPasswordForm {

    @NotBlank(message = "{validation.empty}")
    private String userId;

    @NotBlank(message = "{validation.empty}")
    private String newPassword;
}
