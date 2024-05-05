package pl.adoptme.adopt.me.animal;

import pl.adoptme.adopt.me.animal.form.AnimalSaveForm;

import java.time.LocalDateTime;
import java.util.UUID;

class AnimalFormMapper {
    static Animal createAnimal(AnimalSaveForm animalSaveForm, String createdById) {
        String id = UUID.randomUUID().toString();
        return Animal.builder()
                .id(id)
                .name(animalSaveForm.getName())
                .age(animalSaveForm.getAge())
                .attachmentId(animalSaveForm.getAttachmentId())
                .type(AnimalType.valueOf(animalSaveForm.getType()))
                .breed(AnimalBreed.valueOf(animalSaveForm.getBreed()))
                .color(AnimalColor.valueOf(animalSaveForm.getColor()))
                .hair(AnimalHair.valueOf(animalSaveForm.getHair()))
                .size(AnimalSize.valueOf(animalSaveForm.getSize()))
                .tags(animalSaveForm.getTags())
                .town(animalSaveForm.getTown())
                .contact(animalSaveForm.getContact())
                .createdOn(LocalDateTime.now())
                .createdById(createdById)
                .updateOn(LocalDateTime.now())
                .deletedOn(null)
                .deletedById(null)
                .build();
    }
}
