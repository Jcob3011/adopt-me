package pl.adoptme.adopt.me.activities.form.remove;


import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;


import java.util.ArrayList;
import java.util.List;

public class RemoveUserForm extends ActivityForm {

    @NotBlank
    private final String userId;

    public RemoveUserForm(@NotBlank String description, @NotBlank String createdById, @NotBlank String userId) {
        super(description, createdById);
        this.userId = userId;
    }

    public RemoveUserForm(@NotBlank String createdById, @NotBlank String userId) {
        super(createdById);
        this.userId = userId;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.REMOVED_USER;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("userId", userId));
        return params;
    }
}

