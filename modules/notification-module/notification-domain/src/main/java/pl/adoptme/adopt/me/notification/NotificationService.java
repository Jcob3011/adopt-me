package pl.adoptme.adopt.me.notification;


import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.notification.dto.NotificationForm;
import pl.adoptme.adopt.me.notification.model.Notification;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;


@Validated
public interface NotificationService {
    Notification send(@Valid NotificationForm notificationForm, String createdById);

    SearchResponse<NotificationError> searchErrors(@Valid SearchForm searchForm);
}

