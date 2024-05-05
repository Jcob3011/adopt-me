package pl.adoptme.adopt.me.animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adopt.me.animal.entity.AnimalEntity;

import java.util.List;

@Repository
interface AnimalRepositoryJpa extends JpaRepository<AnimalEntity, String>, JpaSpecificationExecutor<AnimalEntity> {
    List<AnimalEntity> findByType(AnimalType animalType);

    List<AnimalEntity> findByBreed(AnimalBreed animalBreed);

    List<AnimalEntity> findByColor(AnimalColor animalColor);

    List<AnimalEntity> findBySize(AnimalSize animalSize);

    List<AnimalEntity> findByHair(AnimalHair animalHair);

    List<AnimalEntity> findByIdIn(List<String> animalId);
}
