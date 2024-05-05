package pl.adoptme.adopt.me.activities;


import org.springframework.stereotype.Component;

import static pl.adoptme.adopt.me.activities.ActivityParamEntityMapper.mapToActivityParam;
import static pl.adoptme.adopt.me.activities.ActivityParamEntityMapper.mapToActivityParamEntity;


@Component
public class ActivityEntityMapper {

    static ActivityEntity mapToActivityEntity(Activity activity) {
        return ActivityEntity.builder()
                .id(activity.getId())
                .description(activity.getDescription())
                .createdById(activity.getCreatedById())
                .type(activity.getType())
                .createdOn(activity.getCreatedOn())
                .params(mapToActivityParamEntity(activity.getParams(), activity.getId()))
                .build();
    }

    static Activity mapToActivity(ActivityEntity activity) {
        return Activity.builder()
                .id(activity.getId())
                .description(activity.getDescription())
                .createdById(activity.getCreatedById())
                .type(activity.getType())
                .createdOn(activity.getCreatedOn())
                .params(mapToActivityParam(activity.getParams()))
                .build();
    }
}
