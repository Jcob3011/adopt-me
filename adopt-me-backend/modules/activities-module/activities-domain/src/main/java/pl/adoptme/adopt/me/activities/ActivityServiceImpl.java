package pl.adoptme.adopt.me.activities;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;


import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static pl.adoptme.adopt.me.activities.ActivityMapper.createActivity;


@Service
@RequiredArgsConstructor
class ActivityServiceImpl implements ActivityService {
    private final ActivityRepository activityRepository;

    @Override
    public void save(ActivityForm form) {
        Activity createActivity = createActivity(form);
        activityRepository.save(createActivity);
    }

    @Override
    public Activity get(String id) {
        return activityRepository.get(id).orElseThrow(() -> new ApplicationException(ErrorCode.ACTIVITY_NOT_FOUND_EXCEPTION));
    }

    @Override
    public List<Activity> getAll(List<String> ids, boolean withDeleted) {
        return activityRepository.getAll(ids, withDeleted);
    }

    public SearchResponse<Activity> search(SearchForm searchForm) {
        return activityRepository.search(searchForm);
    }

    @Override
    public List<ActivityStatistic> statistic(ActivityStatisticForm statisticForm) {
        return activityRepository.countByTypes(statisticForm);
    }

}

