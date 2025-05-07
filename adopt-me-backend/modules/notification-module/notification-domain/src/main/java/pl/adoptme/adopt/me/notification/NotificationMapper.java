package pl.adoptme.adopt.me.notification;


import pl.adoptme.adopt.me.notification.dto.RegistrationForm;
import pl.adoptme.adopt.me.notification.dto.ResetPasswordForm;
import pl.adoptme.adopt.me.notification.dto.UpdateProfileForm;
import pl.adoptme.adopt.me.notification.model.Registration;
import pl.adoptme.adopt.me.notification.model.ResetPassword;
import pl.adoptme.adopt.me.notification.model.UpdateProfile;

import java.time.LocalDateTime;
import java.util.UUID;

class NotificationMapper {

    public static Registration toRegistration(RegistrationForm registrationForm, String createdById) {
        return Registration.builder()
                .id(UUID.randomUUID().toString())
                .email(registrationForm.getEmail())
                .firstName(registrationForm.getFirstName())
                .lastName(registrationForm.getLastName())
                .url(registrationForm.getUrl())
                .attempts(0)
                .sent(false)
                .createdOn(LocalDateTime.now())
                .createdById(createdById)
                .build();
    }

    public static ResetPassword toResetPassword(ResetPasswordForm resetPasswordForm, String createdById) {
        return ResetPassword.builder()
                .id(UUID.randomUUID().toString())
                .email(resetPasswordForm.getEmail())
                .firstName(resetPasswordForm.getFirstName())
                .lastName(resetPasswordForm.getLastName())
                .url(resetPasswordForm.getUrl())
                .attempts(0)
                .sent(false)
                .createdOn(LocalDateTime.now())
                .createdById(createdById)
                .build();
    }

    public static UpdateProfile toUpdateProfile(UpdateProfileForm updateProfileForm, String createdById) {
        return UpdateProfile.builder()
                .id(UUID.randomUUID().toString())
                .email(updateProfileForm.getEmail())
                .firstName(updateProfileForm.getFirstName())
                .lastName(updateProfileForm.getLastName())
                .url(updateProfileForm.getUrl())
                .attempts(0)
                .sent(false)
                .createdOn(LocalDateTime.now())
                .createdById(createdById)
                .build();
    }
}

