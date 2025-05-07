package pl.adoptme.adopt.me.notification;


import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;

import java.util.ArrayList;
import java.util.List;

import static pl.adoptme.adopt.me.notification.NotificationErrorMapper.*;


class NotificationErrorEntityUtils {
    public static List<NotificationError> listToErrors(List<NotificationErrorEntity> errorEntities) {
        List<NotificationError> errors = new ArrayList<>();
        for (NotificationErrorEntity notificationError : errorEntities) {

            NotificationEntity notificationEntity = notificationError.getNotification();

            if (notificationEntity instanceof UpdateProfileEntity) {
                errors.add(toUpdateProfileError(notificationError));
            } else if (notificationEntity instanceof RegistrationEntity) {
                errors.add(toRegistrationError(notificationError));
            } else if (notificationEntity instanceof ResetPasswordEntity) {
                errors.add(toResetPasswordError(notificationError));
            } else {
                throw new ApplicationException(ErrorCode.NOTIFICATION_TYPE_EXCEPTION);
            }
        }
        return errors;
    }

    public static NotificationError toError(NotificationErrorEntity errorEntity) {
        NotificationEntity notificationEntity = errorEntity.getNotification();

        if (notificationEntity instanceof UpdateProfileEntity) {
            return toUpdateProfileError(errorEntity);
        } else if (notificationEntity instanceof RegistrationEntity) {
            return toRegistrationError(errorEntity);
        } else if (notificationEntity instanceof ResetPasswordEntity) {
            return toResetPasswordError(errorEntity);
        } else {
            throw new ApplicationException(ErrorCode.NOTIFICATION_TYPE_EXCEPTION);
        }
    }
}

