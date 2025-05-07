package pl.adoptme.adopt.me.activities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import static jakarta.persistence.EnumType.STRING;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "activity")
public class ActivityEntity {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "description")
    private String description;
    @Column(name = "created_by_id")
    private String createdById;
    @Enumerated(STRING)
    @Column(name = "type")
    private ActivityType type;
    @Column(name = "created_on")
    private LocalDateTime createdOn;
    @OneToMany(mappedBy = "activityId", cascade = CascadeType.ALL)
    private List<ActivityParamEntity> params;


}
