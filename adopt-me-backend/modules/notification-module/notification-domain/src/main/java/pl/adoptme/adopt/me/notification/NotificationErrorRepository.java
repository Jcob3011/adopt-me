package pl.adoptme.adopt.me.notification;


import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

interface NotificationErrorRepository {
    void save(NotificationError notificationError);

    SearchResponse<NotificationError> search(SearchForm searchForm);
}

