package pl.adoptme.adopt.me.activities.form.add;

import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;

import java.util.ArrayList;
import java.util.List;

public class AddAnimalForm extends ActivityForm {

    @NotBlank
    private final String type;

    public AddAnimalForm(String description, @NotBlank String createdById, @NotBlank String type) {
        super(description, createdById);
        this.type = type;
    }
    public AddAnimalForm(@NotBlank String createdById, @NotBlank String type) {
        super(createdById);
        this.type = type;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.ADDED_ANIMAL;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("type", type));
        return params;
    }
}
