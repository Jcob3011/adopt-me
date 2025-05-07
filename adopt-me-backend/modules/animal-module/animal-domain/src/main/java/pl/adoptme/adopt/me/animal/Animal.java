package pl.adoptme.adopt.me.animal;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Animal {
    private String id;
    private String name;
    private String age;
    private String attachmentId;
    private AnimalType type;
    private AnimalBreed breed;
    private AnimalColor color;
    private AnimalHair hair;
    private AnimalSize size;
    private Set<String> tags;
    private String town;
    private String contact;
    private List<HealthBooklet> healthBooklet;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updateOn;
    private LocalDateTime deletedOn;
    private String deletedById;


    public List<HealthBooklet> getHealthNotDeleted() {
        return healthBooklet.stream()
                .filter(item -> item.getDeletedOn() == null)
                .collect(Collectors.toList());
    }
}