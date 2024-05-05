package pl.adoptme.adopt.me.user.account.activate.account.token.form;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivateAccountForm {

    @NotBlank(message = "{validation.empty}")
    private String token;
}

