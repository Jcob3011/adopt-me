package pl.adoptme.adopt.me.activities.form.remove;


import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;

import java.util.ArrayList;
import java.util.List;

public class RemoveTagForm extends ActivityForm {

    @NotBlank
    private final String tagId;

    public RemoveTagForm(@NotBlank String description, @NotBlank String createdById, @NotBlank String tagId) {
        super(description, createdById);
        this.tagId = tagId;
    }

    public RemoveTagForm(@NotBlank String createdById, @NotBlank String tagId) {
        super(createdById);
        this.tagId = tagId;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.REMOVED_TAG;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("tag", tagId));
        return params;
    }
}

