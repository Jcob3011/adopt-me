package pl.adoptme.adopt.me.activities;


import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;
import java.util.Optional;


interface ActivityRepository {

    List<Activity> getAll(List<String> ids, boolean withDeleted);

    Optional<Activity> get(String id);

    void save(Activity newActivity);

    SearchResponse<Activity> search(SearchForm searchForm);

    List<ActivityStatistic> countByTypes(ActivityStatisticForm statisticForm);
}
