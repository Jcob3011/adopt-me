package pl.adoptme.adopt.me.animal;

import pl.adoptme.adopt.me.animal.entity.HealthBookletEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

class HealthBookletEntityMapper {
    static HealthBookletEntity mapToHealthBookletEntity(HealthBooklet healthBooklet){
        return HealthBookletEntity.builder()
                .id(healthBooklet.getId())
                .sex(healthBooklet.getSex())
                .health(healthBooklet.getHealth())
                .description(healthBooklet.getDescription())
                .animalId(healthBooklet.getAnimalId())
                .admitted(healthBooklet.getAdmitted())
                .createdById(healthBooklet.getCreatedById())
                .updatedOn(healthBooklet.getUpdatedOn())
                .deletedOn(healthBooklet.getDeletedOn())
                .deletedById(healthBooklet.getDeletedById())
                .build();
    }

    static List<HealthBookletEntity> mapToHealthBookletEntity(List<HealthBooklet> healthBooklets){
        if(healthBooklets == null || healthBooklets.isEmpty())
            return Collections.emptyList();

        return healthBooklets.stream().map(HealthBookletEntityMapper::mapToHealthBookletEntity).collect(Collectors.toList());
    }

    static HealthBooklet mapToHealthBooklet(HealthBookletEntity healthBookletEntity) {
        return HealthBooklet.builder()
                .id(healthBookletEntity.getId())
                .sex(healthBookletEntity.getSex())
                .health(healthBookletEntity.getHealth())
                .description(healthBookletEntity.getDescription())
                .animalId(healthBookletEntity.getAnimalId())
                .admitted(healthBookletEntity.getAdmitted())
                .createdById(healthBookletEntity.getCreatedById())
                .updatedOn(healthBookletEntity.getUpdatedOn())
                .deletedOn(healthBookletEntity.getDeletedOn())
                .deletedById(healthBookletEntity.getDeletedById())
                .build();
    }
}
