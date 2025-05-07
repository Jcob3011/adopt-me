package pl.adoptme.adopt.me.notification;


import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@DiscriminatorValue(NotificationType.Names.UPDATE_PROFILE)
@NoArgsConstructor
@Getter
@Setter
class UpdateProfileEntity extends NotificationEntity {
    @Column(name = "url")
    private String url;

    @Builder
    public UpdateProfileEntity(String id, String email, String firstName, String lastName,
                               boolean sent, LocalDateTime createdOn, String createdById, String url,
                               int attempts, LocalDateTime lastAttemptedOn) {
        super(id, email, firstName, lastName, sent, attempts, createdOn, createdById, lastAttemptedOn);
        this.url = url;
    }
}
