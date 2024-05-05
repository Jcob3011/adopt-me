package pl.adoptme.adopt.me.notification.model;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.notification.NotificationType;


import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateProfile extends Notification {
    private String url;

    @Builder
    public UpdateProfile(String id, String email, String firstName, String lastName, boolean sent,
                         LocalDateTime createdOn, String createdById, LocalDateTime lastAttemptedOn, int attempts,
                         String url) {
        super(id, email, firstName, lastName, sent, attempts, createdOn, createdById, lastAttemptedOn);
        this.url = url;
    }

    @Override
    public NotificationType getType() {
        return NotificationType.UPDATE_PROFILE;
    }
}

