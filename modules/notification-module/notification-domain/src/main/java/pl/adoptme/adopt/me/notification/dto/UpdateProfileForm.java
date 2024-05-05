package pl.adoptme.adopt.me.notification.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.notification.NotificationType;

@Getter
@Setter
public class UpdateProfileForm extends NotificationForm {
    @NotBlank
    private String url;

    @Builder
    public UpdateProfileForm(@NotBlank String email, @NotBlank String firstName,
                             @NotBlank String lastName,
                             String url) {
        super(email, firstName, lastName);
        this.url = url;
    }

    public NotificationType getType() {
        return NotificationType.UPDATE_PROFILE;
    }
}

