package pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenValidationForm {

    @NotBlank(message = "{validation.empty}")
    private String token;
}
