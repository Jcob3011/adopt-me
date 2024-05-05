package pl.adoptme.adopt.me.notification;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.ActivityService;
import pl.adoptme.adopt.me.activities.form.SendNotificationForm;
import pl.adoptme.adopt.me.notification.dto.NotificationForm;
import pl.adoptme.adopt.me.notification.dto.RegistrationForm;
import pl.adoptme.adopt.me.notification.dto.ResetPasswordForm;
import pl.adoptme.adopt.me.notification.dto.UpdateProfileForm;
import pl.adoptme.adopt.me.notification.model.Notification;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import static pl.adoptme.adopt.me.notification.NotificationMapper.*;


@Service
@RequiredArgsConstructor
class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationErrorRepository notificationErrorRepository;
    private final ActivityService activityService;

    public Notification send(NotificationForm notificationForm, String createdById) {
        activityService.save(new SendNotificationForm(createdById, notificationForm.getType().name()));
        switch (notificationForm.getType()) {
            case REGISTRATION -> {
                return notificationRepository.save(toRegistration((RegistrationForm) notificationForm, createdById));
            }
            case PASSWORD_RESET -> {
                return notificationRepository.save(toResetPassword((ResetPasswordForm) notificationForm, createdById));
            }
            case UPDATE_PROFILE -> {
                return notificationRepository.save(toUpdateProfile((UpdateProfileForm) notificationForm, createdById));
            }
        }
        throw new ApplicationException(ErrorCode.NOTIFICATION_TYPE_EXCEPTION);
    }

    @Override
    public SearchResponse<NotificationError> searchErrors(SearchForm searchForm) {
        return notificationErrorRepository.search(searchForm);
    }
}
