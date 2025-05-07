package pl.adoptme.adopt.me.login.pass.auth.form;


import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;
import pl.adoptme.adopt.me.user.account.form.UserAccountSaveForm;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class RegisterForm extends UserAccountSaveForm {

    @NotBlank(message = "{validation.empty}")
    private String password;
}
