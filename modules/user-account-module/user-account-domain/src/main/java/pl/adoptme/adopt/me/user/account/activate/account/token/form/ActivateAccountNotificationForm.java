package pl.adoptme.adopt.me.user.account.activate.account.token.form;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivateAccountNotificationForm {

    @NotBlank(message = "{validation.empty}")
    @Email(message = "{validation.invalid}")
    private String email;
}
