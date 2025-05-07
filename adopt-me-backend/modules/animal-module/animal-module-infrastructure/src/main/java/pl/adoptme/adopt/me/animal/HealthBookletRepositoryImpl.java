package pl.adoptme.adopt.me.animal;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adopt.me.animal.entity.HealthBookletEntity;

import java.util.List;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.animal.HealthBookletEntityMapper.mapToHealthBookletEntity;

@Repository
@RequiredArgsConstructor
class HealthBookletRepositoryImpl implements HealthBookletRepository {

    private final HealthBookletRepositoryJpa healthBookletRepositoryJpa;
    private final AnimalRepositoryJpa animalRepositoryJpa;


    @Override
    public List<HealthBooklet> getAll() {
        return healthBookletRepositoryJpa.findAll().stream()
                .map(HealthBookletEntityMapper::mapToHealthBooklet).collect(Collectors.toList());
    }

    @Override
    public HealthBooklet getById(String id) {
        HealthBookletEntity healthBooklet = healthBookletRepositoryJpa.findById(id).orElseThrow(() -> new RuntimeException("HEALTHBOOKLET NOT FOUND"));
        return HealthBookletEntityMapper.mapToHealthBooklet(healthBooklet);
    }

    @Override
    public HealthBooklet save(HealthBooklet healthBooklet) {
        healthBookletRepositoryJpa.save(mapToHealthBookletEntity(healthBooklet));
        return healthBooklet;
    }

    @Override
    public List<HealthBooklet> saveAll(List<HealthBooklet> healthBooklets) {
       healthBookletRepositoryJpa.saveAll(mapToHealthBookletEntity(healthBooklets));
        return healthBooklets;
    }
}
