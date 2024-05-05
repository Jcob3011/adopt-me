package pl.adoptme.adopt.me.login.pass.auth.form;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GmailUserPasswordForm {

    @NotBlank(message = "{validation.empty}")
    private String tokenId;

    @NotBlank(message = "{validation.empty}")
    private String password;
}

