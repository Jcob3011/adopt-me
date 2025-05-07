package pl.adoptme.adopt.me.activities.form.remove;


import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;


import java.util.ArrayList;
import java.util.List;

public class RemoveAttachmentForm extends ActivityForm {

    @NotBlank
    private final String attachmentId;


    public RemoveAttachmentForm(@NotBlank String description, @NotBlank String createdById, @NotBlank String attachmentId) {
        super(description, createdById);
        this.attachmentId = attachmentId;
    }

    public RemoveAttachmentForm(@NotBlank String createdById, @NotBlank String attachmentId) {
        super(createdById);
        this.attachmentId = attachmentId;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.REMOVED_ATTACHMENT;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("attachmentId", attachmentId));
        return params;
    }
}
