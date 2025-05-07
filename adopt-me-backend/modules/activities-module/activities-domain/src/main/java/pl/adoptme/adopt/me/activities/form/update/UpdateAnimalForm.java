package pl.adoptme.adopt.me.activities.form.update;

import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;

import java.util.ArrayList;
import java.util.List;

public class UpdateAnimalForm extends ActivityForm {

    @NotBlank
    private final String animalId;

    public UpdateAnimalForm(@NotBlank String description,@NotBlank String createdById,@NotBlank String animalId) {
        super(description, createdById);
        this.animalId = animalId;
    }

    public UpdateAnimalForm(@NotBlank String createdById,@NotBlank String animalId) {
        super(createdById);
        this.animalId = animalId;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.UPDATE_ANIMAL;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("animalId", animalId));
        return params;
    }
}
