package pl.adoptme.adopt.me.activities.form;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.activities.ActivityType;


import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public abstract class ActivityForm {
    private String description;
    private String createdById;

    public abstract ActivityType getType();

    public abstract List<ActivityParamForm> getParams();

    public ActivityForm(String createdById) {
        this.description = getType().getDescription();
        this.createdById = createdById;
    }
}
