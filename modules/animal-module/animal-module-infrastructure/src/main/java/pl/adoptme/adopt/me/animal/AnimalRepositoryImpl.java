package pl.adoptme.adopt.me.animal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.adoptme.adopt.me.animal.entity.AnimalEntity;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.animal.AnimalEntityMapper.mapToAnimal;
import static pl.adoptme.adopt.me.animal.AnimalEntityMapper.mapToAnimalEntity;
import static pl.adoptme.adoptme.adoptme.common.infrastructure.SearchUtils.createSearchResponse;

@Repository
@RequiredArgsConstructor
@Transactional
class AnimalRepositoryImpl implements AnimalRepository {
    private final AnimalRepositoryJpa animalRepositoryJpa;
    private final List<String> filterList = new ArrayList<>(Arrays.asList("deletedByid",
            "deletedOn",
            "createdById",
            "createdOn",
            "contact",
            "town",
            "tags",
            "size",
            "hair",
            "color",
            "breed",
            "type",
            "attachmentId",
            "name",
            "age",
            "id"));


    @Override
    public List<Animal> getAll() {
        return animalRepositoryJpa.findAll().stream()
                .map(AnimalEntityMapper::mapToAnimal)
                .collect(Collectors.toList());
    }

    @Override
    public Animal getById(String id) {
        Optional<AnimalEntity> animalEntityOptional = animalRepositoryJpa.findById(id);
        if(animalEntityOptional.isEmpty()){
            throw new ApplicationException(ErrorCode.ANIMAL_NOT_FOUND_EXCEPTION);
        }
        AnimalEntity animalEntity = animalEntityOptional.get();
        return mapToAnimal(animalEntity);

    }

    @Override
    public List<Animal> getByBreed(AnimalBreed animalBreed) {
        return animalRepositoryJpa.findByBreed(animalBreed).stream()
                .map(AnimalEntityMapper::mapToAnimal)
                .collect(Collectors.toList());
    }

    @Override
    public List<Animal> getByColor(AnimalColor animalColor) {
        return animalRepositoryJpa.findByColor(animalColor).stream()
                .map(AnimalEntityMapper::mapToAnimal)
                .collect(Collectors.toList());
    }

    @Override
    public List<Animal> getByHair(AnimalHair animalHair) {
        return animalRepositoryJpa.findByHair(animalHair).stream()
                .map(AnimalEntityMapper::mapToAnimal)
                .collect(Collectors.toList());
    }

    @Override
    public List<Animal> getBySize(AnimalSize animalSize) {
        return animalRepositoryJpa.findBySize(animalSize).stream()
                .map(AnimalEntityMapper::mapToAnimal)
                .collect(Collectors.toList());
    }

    @Override
    public List<Animal> getByType(AnimalType animalType) {
        return animalRepositoryJpa.findByType(animalType).stream()
                .map(AnimalEntityMapper::mapToAnimal)
                .collect(Collectors.toList());
    }

    @Override
    public Animal save(Animal animal) {
        animalRepositoryJpa.save(mapToAnimalEntity(animal));
        return animal;
    }

    @Override
    public Optional<Animal> get(String id) {
        return animalRepositoryJpa.findById(id)
                .map(AnimalEntityMapper::mapToAnimal);
    }

    @Override
    public Optional<Animal> get(String id, boolean withDeleted) {
        return animalRepositoryJpa.findById(id)
                .map(AnimalEntityMapper::mapToAnimal)
                .filter(attachment -> {
                    if (withDeleted) {
                        return true;
                    } else {
                        return attachment.getDeletedById() == null;
                    }
                });
    }

    @Override
    public SearchResponse<Animal> search(SearchForm searchForm) {
        return createSearchResponse(animalRepositoryJpa, searchForm, filterList, AnimalEntityMapper::mapToAnimal);
    }

    @Override
    public List<Animal> get(List<String> animalId, boolean withDeleted) {
        return animalRepositoryJpa.findByIdIn(animalId)
                .stream()
                .map(AnimalEntityMapper::mapToAnimal)
                .filter(animal -> {
                    if (withDeleted) {
                        return true;
                    } else {
                        return animal.getDeletedById() == null;
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Animal> get() {
        return animalRepositoryJpa.findAll().stream().map(AnimalEntityMapper::mapToAnimal).collect(Collectors.toList());
    }
}
