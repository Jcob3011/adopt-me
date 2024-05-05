package pl.adoptme.adopt.me.activities.form.add;

import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;

import java.util.ArrayList;
import java.util.List;

public class AddArticleForm extends ActivityForm {

    @NotBlank
    private final String name;


    public AddArticleForm(@NotBlank String description, @NotBlank String createdById, @NotBlank String name) {
        super(description, createdById);
        this.name = name;
    }

    public AddArticleForm(@NotBlank String createdById, @NotBlank String name) {
        super(createdById);
        this.name = name;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.ADDED_ARTICLE;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("name", name));
        return params;
    }
}
