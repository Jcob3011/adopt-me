package pl.adoptme.adopt.me.notification;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.notification.model.Notification;


import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
class NotificationError {
    private String id;
    private Notification notification;
    private String errorMessage;
    private LocalDateTime occurredOn;
}

