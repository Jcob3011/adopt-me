package pl.adoptme.adopt.me.activities;

import java.util.List;

class ActivityDtoMapper {

    static ActivityDto mapToDto(Activity activity) {
        return ActivityDto.builder()
                .id(activity.getId())
                .description(activity.getDescription())
                .createdOn(activity.getCreatedOn())
                .createdById(activity.getCreatedById())
                .type(activity.getType())
                .params((List<ActivityParam>) activity.getParams())
                .build();
    }

    static ActivityDto countToDto(Activity activity) {
        return ActivityDto.builder()
                .type(activity.getType())

                .build();
    }
}

