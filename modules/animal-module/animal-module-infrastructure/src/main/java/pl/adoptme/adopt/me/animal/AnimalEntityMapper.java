package pl.adoptme.adopt.me.animal;

import pl.adoptme.adopt.me.animal.entity.AnimalEntity;

import java.util.stream.Collectors;

class AnimalEntityMapper {
    static AnimalEntity mapToAnimalEntity(Animal animal) {
        return AnimalEntity.builder()
                .id(animal.getId())
                .name(animal.getName())
                .age(animal.getAge())
                .attachmentId(animal.getAttachmentId())
                .breed(animal.getBreed())
                .color(animal.getColor())
                .hair(animal.getHair())
                .size(animal.getSize())
                .type(animal.getType())
                .tags(animal.getTags())
                .town(animal.getTown())
                .contact(animal.getContact())
                .createdById(animal.getCreatedById())
                .createdOn(animal.getCreatedOn())
                .updatedOn(animal.getUpdateOn())
                .deletedById(animal.getDeletedById())
                .deletedOn(animal.getDeletedOn())
                .build();
    }

    static Animal mapToAnimal(AnimalEntity animalEntity){
        return Animal.builder()
                .id(animalEntity.getId())
                .name(animalEntity.getName())
                .age(animalEntity.getAge())
                .attachmentId(animalEntity.getAttachmentId())
                .breed(animalEntity.getBreed())
                .color(animalEntity.getColor())
                .hair(animalEntity.getHair())
                .size(animalEntity.getSize())
                .type(animalEntity.getType())
                .tags(animalEntity.getTags())
                .town(animalEntity.getTown())
                .contact(animalEntity.getContact())
                .healthBooklet(animalEntity.getHealthBooklet().stream()
                        .map(healthBookletEntity -> HealthBooklet.builder()
                                .id(healthBookletEntity.getId())
                                .animalId(animalEntity.getId())
                                .sex(healthBookletEntity.getSex())
                                .health(healthBookletEntity.getHealth())
                                .description(healthBookletEntity.getDescription())
                                .admitted(healthBookletEntity.getAdmitted())
                                .createdById(healthBookletEntity.getCreatedById())
                                .updatedOn(healthBookletEntity.getUpdatedOn())
                                .deletedById(healthBookletEntity.getDeletedById())
                                .deletedOn(healthBookletEntity.getDeletedOn())
                                .build()).collect(Collectors.toList()))
                .createdById(animalEntity.getCreatedById())
                .createdOn(animalEntity.getCreatedOn())
                .updateOn(animalEntity.getUpdatedOn())
                .deletedById(animalEntity.getDeletedById())
                .deletedOn(animalEntity.getDeletedOn())
                .build();
    }


}
