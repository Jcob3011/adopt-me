package pl.adoptme.adopt.me.animal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.ActivityService;
import pl.adoptme.adopt.me.activities.form.add.AddAnimalForm;
import pl.adoptme.adopt.me.activities.form.remove.RemoveAnimalForm;
import pl.adoptme.adopt.me.activities.form.update.UpdateAnimalForm;
import pl.adoptme.adopt.me.animal.form.AnimalSaveForm;
import pl.adoptme.adopt.me.animal.form.AnimalUpdateForm;
import pl.adoptme.adopt.me.animal.form.HealthBookletForm;
import pl.adoptme.adopt.me.attachment.AttachmentService;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.animal.HealthBookletMapper.createHealthBooklet;

@Service
@RequiredArgsConstructor
class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;
    private final ActivityService activityService;
    private final AttachmentService attachmentService;
    private final HealthBookletRepository healthBookletRepository;

    @Override
    public List<Animal> getAll(List<String> animalIds, boolean withDeleted) {
        return animalRepository.get(animalIds, withDeleted);
    }

    @Override
    public Animal getOrNull(String id, boolean withDeleted) {
        Optional<Animal> animal = animalRepository.get(id);
        if (animal.isPresent()) {
            if (withDeleted) {
                return animal.get();
            }
            if (animal.get().getDeletedById() == null) {
                return animal.get();
            }
        }
        return null;
    }

    @Override
    public Animal getById(String animalId) {
        return animalRepository.getById(animalId);
    }

    @Override
    public List<Animal> getByBreed(AnimalBreed animalBreed) {
        return animalRepository.getByBreed(animalBreed);
    }

    @Override
    public List<Animal> getByColor(AnimalColor animalColor) {
        return animalRepository.getByColor(animalColor);
    }

    @Override
    public List<Animal> getByHair(AnimalHair animalHair) {
        return animalRepository.getByHair(animalHair);
    }

    @Override
    public List<Animal> getBySize(AnimalSize animalSize) {
        return animalRepository.getBySize(animalSize);
    }

    @Override
    public List<Animal> getByType(AnimalType animalType) {
        return animalRepository.getByType(animalType);
    }

    @Override
    public Animal save(AnimalSaveForm animalSaveForm, String createdById) {
        Animal animal = AnimalFormMapper.createAnimal(animalSaveForm, createdById);
        animalRepository.save(animal);
        animal.setHealthBooklet(saveHealthBooklet(animalSaveForm.getHealthBooklet(), animal, createdById));
        activityService.save(new AddAnimalForm(createdById, animalSaveForm.getType()));
        return animal;
    }

    private List<HealthBooklet> saveHealthBooklet(List<HealthBookletForm> healthBookletForms, Animal animal, String createById) {
        if (healthBookletForms == null || healthBookletForms.isEmpty())
            return Collections.emptyList();
        return healthBookletRepository.saveAll(healthBookletForms.stream()
                .filter(healthBookletForm -> healthBookletForm.getId() == null)
                .map(form -> createHealthBooklet(form, createById, animal.getId()))
                .collect(Collectors.toList()));
    }

    @Override
    public void update(AnimalUpdateForm form, String id, String userId) {
        Animal animal = animalRepository.getById(id);
        animal.setName(form.getName());
        animal.setAge(form.getAge());
        animal.setType(AnimalType.valueOf(form.getType()));
        animal.setBreed(AnimalBreed.valueOf(form.getBreed()));
        animal.setColor(AnimalColor.valueOf(form.getColor()));
        animal.setHair(AnimalHair.valueOf(form.getHair()));
        animal.setSize(AnimalSize.valueOf(form.getSize()));
        animal.setTags(form.getTags());
        animal.setTown(form.getTown());
        animal.setContact(form.getContact());

        String currentAttachmentId = animal.getAttachmentId();
        if (currentAttachmentId != null && !currentAttachmentId.equals(form.getAttachmentId())) {
            attachmentService.delete(animal.getAttachmentId(), userId);
        }
        animal.setAttachmentId(form.getAttachmentId());
        updateOrCreateNewBooklet(form.getHealthBooklet(), animal, userId);
        deleteHealthBooklet(form.getHealthBookletToDelete(), animal);
        animalRepository.save(animal);
        activityService.save(new UpdateAnimalForm(userId, id));
    }

    @Override
    public void updateOrCreateNewBooklet(List<HealthBookletForm> healthBookletForms, Animal animal, String createdById) {
        List<HealthBookletForm> toUpdate = healthBookletForms.stream().filter(item -> item.getId() != null).toList();
        List<HealthBookletForm> toSave = healthBookletForms.stream().filter(item -> item.getId() != null).toList();
        updateHealthBooklet(toUpdate, animal);
        List<HealthBooklet> tempList = new ArrayList<>();
        tempList.addAll(animal.getHealthBooklet());
        tempList.addAll(saveHealthBooklet(toSave, animal, createdById));
        animal.setHealthBooklet(tempList);
        healthBookletRepository.saveAll(animal.getHealthBooklet());
    }

    private void updateHealthBooklet(List<HealthBookletForm> toUpdate, Animal animal) {
        animal.getHealthBooklet().forEach(healthBooklet -> {
            toUpdate.stream()
                    .filter(healthBookletForm -> healthBooklet.getId().equals(healthBookletForm.getId()))
                    .findFirst().ifPresent(healthBookletForm -> {
                        healthBooklet.setSex(healthBooklet.getSex());
                        healthBooklet.setHealth(healthBooklet.getHealth());
                        healthBooklet.setDescription(healthBooklet.getDescription());
                        healthBooklet.setUpdatedOn(LocalDateTime.now());
                    });
        });
    }

    @Override
    public void delete(String animalId, String deletedById) {
        Animal animal = animalRepository.getById(animalId);
        animal.setDeletedOn(LocalDateTime.now());
        animal.setDeletedById(deletedById);
        animalRepository.save(animal);
        activityService.save(new RemoveAnimalForm(deletedById, animalId));
    }

    private void deleteHealthBooklet(List<String> healthBookletToDelete, Animal animal){
        if(healthBookletToDelete == null || healthBookletToDelete.isEmpty()) return;
        List<HealthBooklet> toDelete = animal.getHealthBooklet()
                .stream()
                .filter(healthBooklet -> healthBookletToDelete.contains(healthBooklet.getId()))
                .toList();
        toDelete.forEach((HealthBooklet::markDeleted));
        healthBookletRepository.saveAll(toDelete);
    }

    @Override
    public SearchResponse<Animal> search(SearchForm searchForm) {
        return animalRepository.search(searchForm);
    }

    @Override
    public List<Animal> get() {
        return animalRepository.get();
    }
}
