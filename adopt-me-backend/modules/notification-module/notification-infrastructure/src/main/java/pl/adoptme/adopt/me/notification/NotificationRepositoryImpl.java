package pl.adoptme.adopt.me.notification;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adopt.me.notification.config.NotificationConfig;
import pl.adoptme.adopt.me.notification.model.Notification;
import pl.adoptme.adopt.me.notification.model.Registration;
import pl.adoptme.adopt.me.notification.model.ResetPassword;
import pl.adoptme.adopt.me.notification.model.UpdateProfile;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;


import java.time.LocalDateTime;

import static pl.adoptme.adopt.me.notification.NotificationEntityMapper.*;


@Repository
@RequiredArgsConstructor
class NotificationRepositoryImpl implements NotificationRepository {
    private final NotificationRepositoryJpa notificationRepositoryJpa;
    private final NotificationConfig notificationConfig;

    public Notification getNotSent() {
        NotificationEntity notificationEntity = notificationRepositoryJpa
                .findFirstBySentFalseAndAttemptsLessThanAndLastAttemptedOnLessThanEqualOrLastAttemptedOnIsNull
                        (notificationConfig.getMaxAttempts(),
                                LocalDateTime.now().minusMinutes(notificationConfig.getResendTime()));
        if (notificationEntity != null) {
            if (notificationEntity instanceof UpdateProfileEntity) {
                return toUpdateProfile((UpdateProfileEntity) notificationEntity);
            } else if (notificationEntity instanceof RegistrationEntity) {
                return toRegistration((RegistrationEntity) notificationEntity);
            } else if (notificationEntity instanceof ResetPasswordEntity) {
                return toResetPassword((ResetPasswordEntity) notificationEntity);
            } else {
                throw new ApplicationException(ErrorCode.NOTIFICATION_TYPE_EXCEPTION);
            }
        }
        return null;
    }

    public Notification save(Notification notification) {
        switch (notification.getType()) {
            case UPDATE_PROFILE -> {
                return toUpdateProfile(notificationRepositoryJpa.save(toUpdateProfileEntity((UpdateProfile) notification)));
            }
            case REGISTRATION -> {
                return toRegistration(notificationRepositoryJpa.save(toRegistrationEntity((Registration) notification)));
            }

            case PASSWORD_RESET -> {
                return toResetPassword(notificationRepositoryJpa.save(toResetPasswordEntity((ResetPassword) notification)));
            }
            default -> throw new ApplicationException(ErrorCode.NOTIFICATION_TYPE_EXCEPTION);
        }
    }
}
