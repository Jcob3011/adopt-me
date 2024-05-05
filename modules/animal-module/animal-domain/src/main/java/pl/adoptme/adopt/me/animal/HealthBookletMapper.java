package pl.adoptme.adopt.me.animal;

import pl.adoptme.adopt.me.animal.form.HealthBookletForm;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

class HealthBookletMapper {
    static HealthBooklet createHealthBooklet(HealthBookletForm healthBookletForm, String createdById, String animalId){
        return HealthBooklet.builder()
                .id(UUID.randomUUID().toString())
                .sex(healthBookletForm.getSex())
                .health(healthBookletForm.getHealth())
                .description(healthBookletForm.getDescription())
                .animalId(animalId)
                .admitted(LocalDateTime.now())
                .createdById(createdById)
                .updatedOn(LocalDateTime.now())
                .deletedOn(null)
                .deletedById(null)
                .build();
    }

    static List<HealthBooklet> createHealthBooklet(List<HealthBookletForm> healthBookletForms, String createdById, String animalId){
        return healthBookletForms.stream()
                .map(healthBookletForm -> createHealthBooklet(healthBookletForm, createdById,animalId))
                .collect(Collectors.toList());
    }

}
