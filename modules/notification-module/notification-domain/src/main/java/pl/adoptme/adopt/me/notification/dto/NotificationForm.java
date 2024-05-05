package pl.adoptme.adopt.me.notification.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.notification.NotificationType;


@Getter
@Setter
@AllArgsConstructor
public abstract class NotificationForm {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;

    public abstract NotificationType getType();
}
