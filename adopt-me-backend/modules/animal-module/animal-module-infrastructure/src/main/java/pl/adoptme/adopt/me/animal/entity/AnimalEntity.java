package pl.adoptme.adopt.me.animal.entity;


import jakarta.persistence.*;
import lombok.*;
import pl.adoptme.adopt.me.animal.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "animal")
public class AnimalEntity {
    @Id
    private String id;
    private String name;
    private String age;
    private String attachmentId;
    @Enumerated(EnumType.STRING)
    private AnimalType type;
    @Enumerated(EnumType.STRING)
    private AnimalBreed breed;
    @Enumerated(EnumType.STRING)
    private AnimalColor color;
    @Enumerated(EnumType.STRING)
    private AnimalHair hair;
    @Enumerated(EnumType.STRING)
    private AnimalSize size;
    @Column(name = "tag_id")
    @ElementCollection
    @CollectionTable(
            name = "animal_tag",
            joinColumns = @JoinColumn(name = "animal_id")
    )
    private Set<String> tags;
    private String town;
    private String contact;

    @OneToMany(mappedBy = "animalId")
    private List<HealthBookletEntity> healthBooklet;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;

}
