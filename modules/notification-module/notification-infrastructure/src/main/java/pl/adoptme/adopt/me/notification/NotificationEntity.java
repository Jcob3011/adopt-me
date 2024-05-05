package pl.adoptme.adopt.me.notification;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity(name = "notifications")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
@Table(name = "notification", indexes = @Index(columnList = "sent, attempts, last_attempted_on", name = "notification_index"))
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
abstract class NotificationEntity {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "email")
    private String email;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "sent")
    private boolean sent;
    @Column(name = "attempts")
    private int attempts;
    @Column(name = "created_on")
    private LocalDateTime createdOn;
    @Column(name = "created_by_id")
    private String createdById;
    @Column(name = "last_attempted_on")
    private LocalDateTime lastAttemptedOn;
}

