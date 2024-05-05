package pl.adoptme.adopt.me.attachment;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.attachment.AttachmentEntityMapper.toAttachment;
import static pl.adoptme.adopt.me.attachment.AttachmentEntityMapper.toEntity;


@RequiredArgsConstructor
@Repository
@Transactional
class AttachmentRepositoryImpl implements AttachmentRepository {

    private final AttachmentRepositoryJpa attachmentRepositoryJpa;

    @Override
    public Attachment save(Attachment attachment) {
        return toAttachment(attachmentRepositoryJpa
                .save(toEntity(attachment)));
    }

    @Override
    public Attachment getOrNull(String id, boolean withDeleted) {
        if (id == null) {
            return null;
        }
        Optional<AttachmentEntity> attachmentOpt = attachmentRepositoryJpa.findById(id);
        if (attachmentOpt.isEmpty()) {
            return null;
        }
        Attachment attachment = toAttachment(attachmentOpt.get());
        if (!withDeleted) {
            if (attachment.getDeletedById() != null) {
                return null;
            }
        }
        return attachment;
    }

    @Override
    public Attachment get(String id) {
        Optional<AttachmentEntity> attachmentOpt = attachmentRepositoryJpa.findById(id);
        if (attachmentOpt.isEmpty()) {
            throw new ApplicationException(ErrorCode.ATTACHMENT_NOT_FOUND_EXCEPTION);
        }
        Attachment attachment = toAttachment(attachmentOpt.get());

        if (attachment.getDeletedById() != null) {
            throw new ApplicationException(ErrorCode.ATTACHMENT_NOT_FOUND_EXCEPTION);
        }
        return attachment;
    }

    @Override
    public List<Attachment> get(List<String> ids, boolean withDeleted) {
        return attachmentRepositoryJpa
                .findByIdIn(ids)
                .stream()
                .map(AttachmentEntityMapper::toAttachment)
                .filter(attachment -> {
                    if (withDeleted) {
                        return true;
                    } else {
                        return attachment.getDeletedById() == null;
                    }
                })
                .collect(Collectors.toList());
    }
}
