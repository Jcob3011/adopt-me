package pl.adoptme.adopt.me.activities;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "activity_param")
public class ActivityParamEntity {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "name")
    private String name;
    @Column(name = "value")
    private String value;
    @Column(name = "activity_id")
    private String activityId;
}
