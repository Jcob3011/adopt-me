package pl.adoptme.adopt.me.user.account.form;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import pl.adoptme.adopt.me.user.account.UserAccountRole;
import pl.adoptme.adopt.me.user.account.UserAccountStatus;
import pl.adoptme.adoptme.common.domain.validation.EnumValidation;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAccountUpdateForm {

    @NotBlank(message = "{validation.empty}")
    private String firstName;

    @NotBlank(message = "{validation.empty}")
    private String lastName;

    @NotBlank(message = "{validation.empty}")
    @Email(message = "{validation.invalid}")
    private String email;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(enumClass = UserAccountRole.class, message = "{validation.invalid}")
    private String role;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(enumClass = UserAccountStatus.class, message = "{validation.invalid}")
    private String status;

    private String attachmentId;
}

