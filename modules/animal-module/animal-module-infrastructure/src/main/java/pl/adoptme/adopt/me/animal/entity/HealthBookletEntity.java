package pl.adoptme.adopt.me.animal.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "health_booklet")
public class HealthBookletEntity {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "sex")
    private String sex;

    @Column(name = "health")
    private Boolean health;

    @Column(name = "description")
    private String description;

    @Column(name = "animal_id")
    private String animalId;

    @Column(name = "admitted")
    private LocalDateTime admitted;

    @Column(name = "created_by_id")
    private String createdById;

    @Column(name = "updated_on")
    private LocalDateTime updatedOn;

    @Column(name = "deleted_on")
    private LocalDateTime deletedOn;

    @Column(name = "deleted_by_id")
    private String deletedById;
}
