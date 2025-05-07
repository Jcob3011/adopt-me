package pl.adoptme.adopt.me.animal;

import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;
import java.util.Optional;

interface AnimalRepository {
    List<Animal> getAll();

    Animal getById(String id);

    List<Animal> getByBreed(AnimalBreed animalBreed);

    List<Animal> getByColor(AnimalColor animalColor);

    List<Animal> getByHair(AnimalHair animalHair);

    List<Animal> getBySize(AnimalSize animalSize);

    List<Animal> getByType(AnimalType animalType);

    Animal save(Animal animal);

    Optional<Animal> get(String id);

    Optional<Animal> get(String id, boolean withDeleted);

    List<Animal> get(List<String> animalId, boolean withDeleted);

    SearchResponse<Animal> search(SearchForm searchForm);

    List<Animal> get();
}
