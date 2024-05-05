package pl.adoptme.adopt.me.notification;


import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "notification_error")
@ToString
class NotificationErrorEntity {

    @Id
    @Column(name = "id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "notification_id", nullable = false)
    private NotificationEntity notification;

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "occurred_on")
    private LocalDateTime occurredOn;
}
