package pl.adoptme.adopt.me.activities.form.remove;

import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;

import java.util.ArrayList;
import java.util.List;

public class RemoveAnimalForm extends ActivityForm {

    @NotBlank
    private final String type;


    public RemoveAnimalForm(@NotBlank String description, @NotBlank String createdById,@NotBlank String animalId) {
        super(description, createdById);
        this.type =animalId;
    }

    public RemoveAnimalForm(@NotBlank String createdById,@NotBlank String animalId) {
        super(createdById);
        this.type = animalId;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.REMOVED_ANIMAL;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("type", type));
        return params;
    }
}
