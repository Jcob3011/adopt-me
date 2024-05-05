package pl.adoptme.adopt.me.animal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.adoptme.adopt.me.animal.entity.HealthBookletEntity;
@Repository
interface HealthBookletRepositoryJpa extends JpaRepository<HealthBookletEntity, String> {
}
