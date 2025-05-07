package pl.adoptme.adopt.me.activities;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class Activity {
    String id;
    private String description;
    LocalDateTime createdOn;
    String createdById;
    ActivityType type;
    List<ActivityParam> params;
}

