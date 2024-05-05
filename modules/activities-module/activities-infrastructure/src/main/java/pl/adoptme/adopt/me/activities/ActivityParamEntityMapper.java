package pl.adoptme.adopt.me.activities;


import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class ActivityParamEntityMapper {

    static ActivityParamEntity mapToActivityParamEntity(ActivityParam activityParam, String activitiesId) {
        return ActivityParamEntity.builder()
                .id(activityParam.getId())
                .name(activityParam.getName())
                .value(activityParam.getValue())
                .activityId(activitiesId)
                .build();
    }

    static List<ActivityParamEntity> mapToActivityParamEntity(List<ActivityParam> activityParams, String activitiesId) {
        if (activityParams == null || activityParams.isEmpty()) return Collections.emptyList();

        return activityParams.stream().map(item -> mapToActivityParamEntity(item, activitiesId)).toList();
    }

    static ActivityParam mapToActivityParam(ActivityParamEntity activityParam) {
        return ActivityParam.builder()
                .id(activityParam.getId())
                .name(activityParam.getName())
                .value(activityParam.getValue())
                .build();
    }

    static List<ActivityParam> mapToActivityParam(List<ActivityParamEntity> activityParams) {
        if (activityParams == null || activityParams.isEmpty()) return Collections.emptyList();

        return activityParams.stream().map(ActivityParamEntityMapper::mapToActivityParam).toList();
    }
}

