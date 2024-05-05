package pl.adoptme.adopt.me.notification;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue(NotificationType.Names.REGISTRATION)
@NoArgsConstructor
@Getter
@Setter
class RegistrationEntity extends NotificationEntity {
    @Column(name = "url")
    private String url;

    @Builder
    public RegistrationEntity(String id, String email, String firstName, String lastName,
                              boolean sent, LocalDateTime createdOn, String createdById,
                              String url, int attempts, LocalDateTime lastAttemptedOn) {
        super(id, email, firstName, lastName, sent, attempts, createdOn, createdById, lastAttemptedOn);
        this.url = url;
    }
}
