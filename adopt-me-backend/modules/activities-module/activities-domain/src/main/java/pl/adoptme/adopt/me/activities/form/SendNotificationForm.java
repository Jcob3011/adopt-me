package pl.adoptme.adopt.me.activities.form;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.activities.ActivityType;


import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class SendNotificationForm extends ActivityForm {


    private final String type;

    public SendNotificationForm(@NotBlank String description, @NotBlank String createdById, @NotBlank String type) {
        super(description, createdById);
        this.type = type;
    }

    public SendNotificationForm(@NotBlank String createdById, @NotBlank String type) {
        super(createdById);
        this.type = type;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.SENT_NOTIFICATION;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm(type, type));
        return params;
    }
}
