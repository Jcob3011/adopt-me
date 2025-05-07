package pl.adoptme.adopt.me.activities.form.remove;

import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;

import java.util.ArrayList;
import java.util.List;

public class RemoveArticleForm extends ActivityForm {
    @NotBlank
    private final String type;

    public RemoveArticleForm(@NotBlank String description, @NotBlank String createdById,@NotBlank String articleId) {
        super(description, createdById);
        this.type = articleId;
    }

    public RemoveArticleForm(@NotBlank String createdById,@NotBlank String articleId) {
        super(createdById);
        this.type = articleId;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.REMOVED_ARTICLE;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("type", type));
        return params;
    }
}
