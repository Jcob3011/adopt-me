package pl.adoptme.adopt.me.activities;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.activities.ActivityDtoMapper.mapToDto;


@RestController
@RequestMapping("/activities")
@RequiredArgsConstructor
class ActivityController {

    private final ActivityService activityService;

    @GetMapping("/{id}")
    public ActivityDto get(@PathVariable String id) {
        return mapToDto(activityService.get(id));
    }

    @GetMapping("/all")
    public List<ActivityDto> getAllActivities() {
        List<String> ids = new ArrayList<>();
        return activityService.getAll(ids, true).stream()
                .map(ActivityDtoMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/search")
    public SearchResponse<ActivityDto> search(@RequestBody SearchForm searchForm) {
        return activityService.search(searchForm).map(ActivityDtoMapper::mapToDto);
    }

    @PostMapping("/statistics")
    public List<ActivityStatistic> statistics(@RequestBody ActivityStatisticForm statisticForm) {
        return activityService.statistic(statisticForm);
    }
}
