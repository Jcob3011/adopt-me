package pl.adoptme.adopt.me.user.account.form;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import pl.adoptme.adopt.me.user.account.UserAccountRole;
import pl.adoptme.adoptme.common.domain.validation.EnumValidation;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class UserAccountSaveForm {

    @NotBlank(message = "{validation.empty}")
    private String firstName;

    @NotBlank(message = "{validation.empty}")
    private String lastName;

    @NotBlank(message = "{validation.empty}")
    @Email(message = "{validation.invalid}")
    private String email;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(
            enumClass = UserAccountRole.class,
            message = "{validation.invalid}"
    )
    private String role;
    private UserAccountImage attachment;
}