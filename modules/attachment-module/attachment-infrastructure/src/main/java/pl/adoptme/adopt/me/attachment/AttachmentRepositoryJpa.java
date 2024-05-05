package pl.adoptme.adopt.me.attachment;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface AttachmentRepositoryJpa extends JpaRepository<AttachmentEntity, String> {
    List<AttachmentEntity> findByIdIn(List<String> ids);
}
