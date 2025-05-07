package pl.adoptme.adopt.me.notification;


import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.thymeleaf.spring5.SpringTemplateEngine;
import pl.adoptme.adopt.me.notification.model.Notification;


import java.time.LocalDateTime;
import java.util.UUID;

import static pl.adoptme.adopt.me.notification.MailUtils.prepareMailMessage;


@Component
@RequiredArgsConstructor
class NotificationSenderScheduler {
    private final NotificationRepository notificationRepository;
    private final NotificationErrorRepository notificationErrorRepository;
    // private final SpringTemplateEngine templateEngine;
    private final JavaMailSender javaMailSender;

    @Scheduled(fixedDelayString = "${notification.emailPerMilis}")
    public void sendEmail() {
        Notification notification = notificationRepository.getNotSent();
        if (notification != null) {
            notification.setAttempts(notification.getAttempts() + 1);
            notification.setLastAttemptedOn(LocalDateTime.now());
            try {
                MimeMessage message = javaMailSender.createMimeMessage();

                //prepareMailMessage(notification, message, templateEngine);

                javaMailSender.send(message);
                notification.setSent(true);
                notificationRepository.save(notification);
            } catch (Exception e) {
                notificationRepository.save(notification);
                notificationErrorRepository.save(NotificationError.builder()
                        .id(UUID.randomUUID().toString())
                        .notification(notification)
                        .errorMessage(e.getMessage())
                        .occurredOn(LocalDateTime.now())
                        .build());
            }
        }
    }
}

