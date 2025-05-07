package pl.adoptme.adopt.me.activities;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class ActivityDto {
    private String id;
    private String description;
    private LocalDateTime createdOn;
    private String createdById;
    private ActivityType type;
    private List<ActivityParam> params;
}
