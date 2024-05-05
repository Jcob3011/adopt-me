package pl.adoptme.adopt.me.animal;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collector;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class HealthBooklet {
    private String id;
    private String sex;
    private Boolean health;
    private String description;
    private String animalId;
    private LocalDateTime admitted;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;

    void markDeleted() {
        if (deletedOn == null) {
            deletedOn = LocalDateTime.now();
        }
    }
}
