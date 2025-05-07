package pl.adoptme.adopt.me.activities.form.add;


import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;


import java.util.ArrayList;
import java.util.List;

public class AddUserForm extends ActivityForm {

    @NotBlank
    private final String email;

    public AddUserForm(@NotBlank String description, @NotBlank String createdById, @NotBlank String email) {
        super(description, createdById);
        this.email = email;
    }

    public AddUserForm(@NotBlank String createdById, @NotBlank String email) {
        super(createdById);
        this.email = email;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.ADDED_USER;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("email", email));
        return params;
    }
}
