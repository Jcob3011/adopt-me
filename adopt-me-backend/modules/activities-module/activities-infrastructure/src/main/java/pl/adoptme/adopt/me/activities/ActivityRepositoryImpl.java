package pl.adoptme.adopt.me.activities;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;


import java.util.*;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.activities.ActivityEntityMapper.mapToActivityEntity;
import static pl.adoptme.adoptme.adoptme.common.infrastructure.SearchUtils.createSearchResponse;


@Repository
@RequiredArgsConstructor
class ActivityRepositoryImpl implements ActivityRepository {
    private final ActivityRepositoryJpa activityRepositoryJpa;

    private final List<String> filterList = new ArrayList<>(Arrays.asList("id", "description", "createdOn", "createdById", "type", "params"));


    @Override
    public List<Activity> getAll(List<String> ids, boolean withDeleted) {
        return activityRepositoryJpa
                .findAll()
                .stream()
                .map(ActivityEntityMapper::mapToActivity)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Activity> get(String id) {
        return activityRepositoryJpa.findById(id)
                .map(ActivityEntityMapper::mapToActivity);
    }

    @Override
    public void save(Activity newActivity) {
        activityRepositoryJpa.save(mapToActivityEntity(newActivity));
    }

    @Override
    public SearchResponse<Activity> search(SearchForm searchForm) {
        return createSearchResponse(activityRepositoryJpa, searchForm, filterList, ActivityEntityMapper::mapToActivity);
    }

    @Override
    public List<ActivityStatistic> countByTypes(ActivityStatisticForm statisticForm) {
        return activityRepositoryJpa
                .activityCount(statisticForm.getType(), statisticForm.getCreatedOnFrom(), statisticForm.getCreatedOnTo())
                .stream().map(item -> ActivityStatistic.builder().count(item.getTotal()).type(item.getActivityType()).build()).toList();
    }
}
