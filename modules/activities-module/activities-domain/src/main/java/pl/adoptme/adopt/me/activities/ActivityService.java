package pl.adoptme.adopt.me.activities;


import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;


import java.util.List;

@Validated
public interface ActivityService {

    void save(ActivityForm form);

    Activity get(String id);

    List<Activity> getAll(List<String> ids, boolean withDeleted);

    SearchResponse<Activity> search(@Valid SearchForm searchForm);

    List<ActivityStatistic> statistic(@Valid ActivityStatisticForm statisticForm);
}

