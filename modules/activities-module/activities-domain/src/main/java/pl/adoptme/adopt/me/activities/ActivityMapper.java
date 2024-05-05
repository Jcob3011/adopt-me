package pl.adoptme.adopt.me.activities;


import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

class ActivityMapper {

    static Activity createActivity(ActivityForm form) {
        return Activity.builder()
                .id(UUID.randomUUID().toString())
                .description(form.getDescription())
                .createdOn(LocalDateTime.now())
                .createdById(form.getCreatedById())
                .type(form.getType())
                .params(prepareParamsToSave(form.getParams()))
                .build();
    }

    private static List<ActivityParam> prepareParamsToSave(List<ActivityParamForm> params) {
        if (params == null || params.isEmpty()) return Collections.emptyList();

        return params.stream().map(param -> new ActivityParam(UUID.randomUUID().toString(), param.getName(), param.getValue())).toList();
    }
}

