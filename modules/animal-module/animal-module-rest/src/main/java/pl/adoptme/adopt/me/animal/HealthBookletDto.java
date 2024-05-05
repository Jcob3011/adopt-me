package pl.adoptme.adopt.me.animal;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class HealthBookletDto {
    private String id;
    private String sex;
    private boolean health;
    private String description;
    private String animalId;
    private LocalDateTime admitted;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;
}
