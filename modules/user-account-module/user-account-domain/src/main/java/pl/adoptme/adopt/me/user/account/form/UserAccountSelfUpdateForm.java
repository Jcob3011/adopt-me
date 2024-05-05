package pl.adoptme.adopt.me.user.account.form;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAccountSelfUpdateForm {

    @NotBlank(message = "{validation.empty}")
    private String firstName;

    @NotBlank(message = "{validation.empty}")
    private String lastName;

    @NotBlank(message = "{validation.empty}")
    @Email(message = "{validation.invalid}")
    private String email;

    @NotBlank(message = "{validation.empty}")
    private String attachmentId;
}
