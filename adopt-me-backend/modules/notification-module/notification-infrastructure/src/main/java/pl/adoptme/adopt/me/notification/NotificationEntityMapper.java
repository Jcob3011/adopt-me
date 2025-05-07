package pl.adoptme.adopt.me.notification;


import pl.adoptme.adopt.me.notification.model.Registration;
import pl.adoptme.adopt.me.notification.model.ResetPassword;
import pl.adoptme.adopt.me.notification.model.UpdateProfile;

class NotificationEntityMapper {

    public static UpdateProfileEntity toUpdateProfileEntity(UpdateProfile updateProfile) {
        return UpdateProfileEntity.builder()
                .id(updateProfile.getId())
                .email(updateProfile.getEmail())
                .firstName(updateProfile.getFirstName())
                .lastName(updateProfile.getLastName())
                .attempts(updateProfile.getAttempts())
                .url(updateProfile.getUrl())
                .sent(updateProfile.isSent())
                .createdOn(updateProfile.getCreatedOn())
                .createdById(updateProfile.getCreatedById())
                .lastAttemptedOn(updateProfile.getLastAttemptedOn())
                .build();
    }


    public static ResetPasswordEntity toResetPasswordEntity(ResetPassword resetPassword) {
        return ResetPasswordEntity.builder()
                .id(resetPassword.getId())
                .email(resetPassword.getEmail())
                .firstName(resetPassword.getFirstName())
                .lastName(resetPassword.getLastName())
                .url(resetPassword.getUrl())
                .sent(resetPassword.isSent())
                .attempts(resetPassword.getAttempts())
                .createdOn(resetPassword.getCreatedOn())
                .createdById(resetPassword.getCreatedById())
                .lastAttemptedOn(resetPassword.getLastAttemptedOn())
                .build();
    }

    public static RegistrationEntity toRegistrationEntity(Registration registration) {
        return RegistrationEntity.builder()
                .id(registration.getId())
                .email(registration.getEmail())
                .firstName(registration.getFirstName())
                .lastName(registration.getLastName())
                .url(registration.getUrl())
                .attempts(registration.getAttempts())
                .sent(registration.isSent())
                .createdOn(registration.getCreatedOn())
                .createdById(registration.getCreatedById())
                .lastAttemptedOn(registration.getLastAttemptedOn())
                .build();
    }

    public static UpdateProfile toUpdateProfile(UpdateProfileEntity updateProfileEntity) {
        return UpdateProfile.builder()
                .id(updateProfileEntity.getId())
                .email(updateProfileEntity.getEmail())
                .firstName(updateProfileEntity.getFirstName())
                .lastName(updateProfileEntity.getLastName())
                .url(updateProfileEntity.getUrl())
                .attempts(updateProfileEntity.getAttempts())
                .sent(updateProfileEntity.isSent())
                .createdOn(updateProfileEntity.getCreatedOn())
                .createdById(updateProfileEntity.getCreatedById())
                .lastAttemptedOn(updateProfileEntity.getLastAttemptedOn())
                .build();
    }

    public static ResetPassword toResetPassword(ResetPasswordEntity resetPasswordEntity) {
        return ResetPassword.builder()
                .id(resetPasswordEntity.getId())
                .email(resetPasswordEntity.getEmail())
                .firstName(resetPasswordEntity.getFirstName())
                .lastName(resetPasswordEntity.getLastName())
                .url(resetPasswordEntity.getUrl())
                .sent(resetPasswordEntity.isSent())
                .attempts(resetPasswordEntity.getAttempts())
                .createdOn(resetPasswordEntity.getCreatedOn())
                .createdById(resetPasswordEntity.getCreatedById())
                .lastAttemptedOn(resetPasswordEntity.getLastAttemptedOn())
                .build();
    }

    public static Registration toRegistration(RegistrationEntity registrationEntity) {
        return Registration.builder()
                .id(registrationEntity.getId())
                .email(registrationEntity.getEmail())
                .firstName(registrationEntity.getFirstName())
                .lastName(registrationEntity.getLastName())
                .url(registrationEntity.getUrl())
                .sent(registrationEntity.isSent())
                .attempts(registrationEntity.getAttempts())
                .createdOn(registrationEntity.getCreatedOn())
                .createdById(registrationEntity.getCreatedById())
                .lastAttemptedOn(registrationEntity.getLastAttemptedOn())
                .build();
    }

}
