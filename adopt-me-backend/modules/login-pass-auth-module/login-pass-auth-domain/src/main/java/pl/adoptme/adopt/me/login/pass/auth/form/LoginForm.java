package pl.adoptme.adopt.me.login.pass.auth.form;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginForm {

    @NotBlank(message = "{validation.empty}")
    private String email;

    @NotBlank(message = "{validation.empty}")
    private String password;
}
