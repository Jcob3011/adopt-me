package pl.adoptme.adopt.me.activities.form.add;


import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;


import java.util.ArrayList;
import java.util.List;

public class AddTagForm extends ActivityForm {

    @NotBlank
    private final String name;


    public AddTagForm(@NotBlank String description, @NotBlank String createdById, @NotBlank String name) {
        super(description, createdById);
        this.name = name;
    }

    public AddTagForm(@NotBlank String createdById, @NotBlank String name) {
        super(createdById);
        this.name = name;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.ADDED_TAG;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("tag", name));
        return params;
    }
}
