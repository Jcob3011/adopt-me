package pl.adoptme.adopt.me.activities.form;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.activities.ActivityType;


import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class FailLoginForm extends ActivityForm {


    private final String email;

    public FailLoginForm(@NotBlank String description, @NotBlank String createdById, @NotBlank String email) {
        super(description, createdById);
        this.email = email;
    }

    public FailLoginForm(@NotBlank String createdById, @NotBlank String email) {
        super(createdById);
        this.email = email;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.LOGIN_FAILED;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("email", email));
        return params;
    }
}
