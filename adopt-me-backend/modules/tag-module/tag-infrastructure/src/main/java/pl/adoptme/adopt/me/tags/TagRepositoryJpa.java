package pl.adoptme.adopt.me.tags;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
interface TagRepositoryJpa extends JpaRepository<TagEntity, String>, JpaSpecificationExecutor<TagEntity> {

    List<TagEntity> findByIdIn(List<String> ids);
    Optional<TagEntity> findByNameIgnoreCaseAndDeletedByIdNull(String name);
}