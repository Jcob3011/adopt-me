package pl.adoptme.adopt.me.animal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.tags.TagDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder

public class AnimalDto {
    private String id;
    private String name;
    private String age;
    private String attachmentId;
    private AnimalType type;
    private AnimalBreed breed;
    private AnimalColor color;
    private AnimalHair hair;
    private AnimalSize size;
    private Set<TagDto> tags;
    private List<HealthBooklet> healthBooklet;
    private String town;
    private String contact;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updateOn;
    private LocalDateTime deletedOn;
    private String deletedById;
}
