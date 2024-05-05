package pl.adoptme.adopt.me.notification;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
class NotificationDto {

    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private NotificationType type;
    private String content;
    private boolean sent;
    private LocalDateTime createdOn;
    private String createdById;
}
