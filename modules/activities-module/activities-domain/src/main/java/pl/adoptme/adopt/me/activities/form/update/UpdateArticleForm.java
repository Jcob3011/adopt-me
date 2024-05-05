package pl.adoptme.adopt.me.activities.form.update;

import jakarta.validation.constraints.NotBlank;
import pl.adoptme.adopt.me.activities.ActivityType;
import pl.adoptme.adopt.me.activities.form.ActivityForm;
import pl.adoptme.adopt.me.activities.form.ActivityParamForm;

import java.util.ArrayList;
import java.util.List;

public class UpdateArticleForm extends ActivityForm {

    @NotBlank
    private final String articleId;

    public UpdateArticleForm(@NotBlank String description,@NotBlank String createdById,@NotBlank String articleId) {
        super(description, createdById);
        this.articleId = articleId;
    }

    public UpdateArticleForm(@NotBlank String createdById,@NotBlank String articleId) {
        super(createdById);
        this.articleId = articleId;
    }

    @Override
    public ActivityType getType() {
        return ActivityType.UPDATE_ARTICLE;
    }

    @Override
    public List<ActivityParamForm> getParams() {
        List<ActivityParamForm> params = new ArrayList<>();
        params.add(new ActivityParamForm("articleId", articleId));
        return params;
    }
}
