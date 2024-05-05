package pl.adoptme.adopt.me.notification;


import static pl.adoptme.adopt.me.notification.NotificationEntityMapper.*;

class NotificationErrorMapper {
    public static NotificationErrorEntity toUpdateProfileErrorEntity(NotificationError notificationError) {
        return NotificationErrorEntity.builder()
                .id(notificationError.getId())
                .notification(UpdateProfileEntity.builder()
                        .id(notificationError.getNotification().getId())
                        .email(notificationError.getNotification().getEmail())
                        .firstName(notificationError.getNotification().getFirstName())
                        .lastName(notificationError.getNotification().getLastName())
                        .attempts(notificationError.getNotification().getAttempts())
                        .sent(notificationError.getNotification().isSent())
                        .createdById(notificationError.getNotification().getCreatedById())
                        .createdOn(notificationError.getNotification().getCreatedOn())
                        .lastAttemptedOn(notificationError.getNotification().getLastAttemptedOn())
                        .build())
                .errorMessage(notificationError.getErrorMessage())
                .occurredOn(notificationError.getOccurredOn())
                .build();
    }

    public static NotificationErrorEntity toResetPasswordErrorEntity(NotificationError notificationError) {
        return NotificationErrorEntity.builder()
                .id(notificationError.getId())
                .notification(ResetPasswordEntity.builder()
                        .id(notificationError.getNotification().getId())
                        .email(notificationError.getNotification().getEmail())
                        .firstName(notificationError.getNotification().getFirstName())
                        .lastName(notificationError.getNotification().getLastName())
                        .sent(notificationError.getNotification().isSent())
                        .attempts(notificationError.getNotification().getAttempts())
                        .createdById(notificationError.getNotification().getCreatedById())
                        .createdOn(notificationError.getNotification().getCreatedOn())
                        .lastAttemptedOn(notificationError.getNotification().getLastAttemptedOn())
                        .build())
                .errorMessage(notificationError.getErrorMessage())
                .occurredOn(notificationError.getOccurredOn())
                .build();
    }


    public static NotificationErrorEntity toRegistrationErrorEntity(NotificationError notificationError) {
        return NotificationErrorEntity.builder()
                .id(notificationError.getId())
                .notification(RegistrationEntity.builder()
                        .id(notificationError.getNotification().getId())
                        .email(notificationError.getNotification().getEmail())
                        .firstName(notificationError.getNotification().getFirstName())
                        .lastName(notificationError.getNotification().getLastName())
                        .sent(notificationError.getNotification().isSent())
                        .attempts(notificationError.getNotification().getAttempts())
                        .createdById(notificationError.getNotification().getCreatedById())
                        .createdOn(notificationError.getNotification().getCreatedOn())
                        .lastAttemptedOn(notificationError.getNotification().getLastAttemptedOn())
                        .build())
                .errorMessage(notificationError.getErrorMessage())
                .occurredOn(notificationError.getOccurredOn())
                .build();
    }

    public static NotificationError toUpdateProfileError(NotificationErrorEntity notificationErrorEntity) {
        return NotificationError.builder()
                .id(notificationErrorEntity.getId())
                .notification(toUpdateProfile((UpdateProfileEntity) notificationErrorEntity.getNotification()))
                .errorMessage(notificationErrorEntity.getErrorMessage())
                .occurredOn(notificationErrorEntity.getOccurredOn())
                .build();
    }

    public static NotificationError toResetPasswordError(NotificationErrorEntity notificationErrorEntity) {
        return NotificationError.builder()
                .id(notificationErrorEntity.getId())
                .notification(toResetPassword((ResetPasswordEntity) notificationErrorEntity.getNotification()))
                .errorMessage(notificationErrorEntity.getErrorMessage())
                .occurredOn(notificationErrorEntity.getOccurredOn())
                .build();
    }


    public static NotificationError toRegistrationError(NotificationErrorEntity notificationErrorEntity) {
        return NotificationError.builder()
                .id(notificationErrorEntity.getId())
                .notification(toRegistration((RegistrationEntity) notificationErrorEntity.getNotification()))
                .errorMessage(notificationErrorEntity.getErrorMessage())
                .occurredOn(notificationErrorEntity.getOccurredOn())
                .build();
    }
}

