package pl.adoptme.adopt.me.animal;

import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.animal.form.AnimalSaveForm;
import pl.adoptme.adopt.me.animal.form.AnimalUpdateForm;
import pl.adoptme.adopt.me.animal.form.HealthBookletForm;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;

@Validated
public interface AnimalService {
    List<Animal> getAll(List<String> animalId, boolean withDeleted);

    Animal getOrNull(String id, boolean withDeleted);

    Animal getById(String animalId);

    List<Animal> getByBreed(AnimalBreed animalBreed);

    List<Animal> getByColor(AnimalColor animalColor);

    List<Animal> getByHair(AnimalHair animalHair);

    List<Animal> getBySize(AnimalSize animalSize);

    List<Animal> getByType(AnimalType animalType);

    Animal save(@Valid AnimalSaveForm animalSaveForm, String createdById);

    void update(@Valid AnimalUpdateForm animalUpdateForm, String id, String createdById);

    void updateOrCreateNewBooklet(List<HealthBookletForm> healthBookletForms, Animal animal, String createdById);

    void delete(String animalId, String deletedById);

    SearchResponse<Animal> search(SearchForm searchForm);

    List<Animal> get();
}
