package pl.adoptme.adopt.me.notification.model;


import lombok.*;
import pl.adoptme.adopt.me.notification.NotificationType;


import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
public abstract class Notification {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private boolean sent;
    private int attempts;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime lastAttemptedOn;

    public abstract NotificationType getType();
}

