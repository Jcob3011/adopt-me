package pl.adoptme.adopt.me.notification;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static pl.adoptme.adopt.me.notification.NotificationErrorMapper.*;
import static pl.adoptme.adoptme.adoptme.common.infrastructure.SearchUtils.createSearchResponse;

@Repository
@RequiredArgsConstructor
class NotificationErrorRepositoryImpl implements NotificationErrorRepository {
    private final NotificationErrorRepositoryJpa notificationErrorRepositoryJpa;
    private final List<String> filterList = new ArrayList<>(Arrays.asList("occurredOn", "errorMessage", "id"));

    @Override
    public void save(NotificationError notificationError) {
        switch (notificationError.getNotification().getType()) {
            case UPDATE_PROFILE -> notificationErrorRepositoryJpa.save(toUpdateProfileErrorEntity(notificationError));
            case REGISTRATION -> notificationErrorRepositoryJpa.save(toRegistrationErrorEntity(notificationError));
            case PASSWORD_RESET -> notificationErrorRepositoryJpa.save(toResetPasswordErrorEntity(notificationError));
            default -> throw new ApplicationException(ErrorCode.NOTIFICATION_TYPE_EXCEPTION);
        }
    }
    @Override
    public SearchResponse<NotificationError> search(SearchForm searchForm) {
        return createSearchResponse(notificationErrorRepositoryJpa, searchForm, filterList, NotificationErrorEntityUtils::toError);
    }
}
