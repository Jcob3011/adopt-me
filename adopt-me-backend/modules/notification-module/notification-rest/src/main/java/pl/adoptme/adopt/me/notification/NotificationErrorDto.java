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
class NotificationErrorDto {
    private String id;
    private Notification notification;
    private String errorMessage;
    private LocalDateTime occurredOn;

    public static NotificationErrorDto of(NotificationError notificationError) {
        return NotificationErrorDto.builder()
                .id(notificationError.getId())
                .notification(notificationError.getNotification())
                .errorMessage(notificationError.getErrorMessage())
                .occurredOn(notificationError.getOccurredOn())
                .build();
    }
}
