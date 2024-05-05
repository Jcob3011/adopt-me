package pl.adoptme.adopt.me.attachment;




import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.ActivityService;
import pl.adoptme.adopt.me.activities.form.add.AddAttachmentForm;
import pl.adoptme.adopt.me.activities.form.remove.RemoveAttachmentForm;
import pl.adoptme.adopt.me.attachment.dto.AttachmentCreateForm;
import pl.adoptme.adopt.me.attachment.dto.BytesWithExtension;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static pl.adoptme.adopt.me.attachment.AttachmentMapper.toAttachment;


@Service
@RequiredArgsConstructor
class AttachmentServiceImpl implements AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final StorageRepository storageRepository;
    private final ActivityService activityService;


    @Override
    public Attachment get(String id) {
        return attachmentRepository.get(id);
    }

    @Override
    public List<Attachment> getAll(List<String> ids, boolean withDeleted) {
        return attachmentRepository.get(ids, withDeleted);
    }

    @Override
    public Attachment getOrNull(String id, boolean withDeleted) {
        return attachmentRepository.getOrNull(id, withDeleted);
    }

    @Override
    public Attachment save(AttachmentCreateForm attachmentCreateForm) {
        Attachment attachment = toAttachment(attachmentCreateForm);
        String path = storageRepository.save(attachmentCreateForm.getImage(), attachment.getId());
        attachment.setPath(path);
        activityService.save(new AddAttachmentForm(attachmentCreateForm.getCreatedById(), attachmentCreateForm.getOriginalFileName()));
        return attachmentRepository.save(attachment);
    }

    @Override
    public void delete(String id, String deletedById) {
        Attachment attachment = attachmentRepository.get(id);
        storageRepository.delete(attachment.getPath());
        attachment.setDeletedById(deletedById);
        attachment.setDeletedOn(LocalDateTime.now());
        attachment.setPath(null);
        attachmentRepository.save(attachment);
        activityService.save(new RemoveAttachmentForm(deletedById, id));
    }

    @Override
    public BytesWithExtension download(String id) {
        Attachment attachment = attachmentRepository.get(id);
        if(attachment.getPath() == null) {
            throw new ApplicationException(ErrorCode.FILE_NOT_FOUND_EXCEPTION);
        }
        byte[] bytes = storageRepository.get(attachment.getPath());
        return new BytesWithExtension(bytes, attachment.getExtension());
    }
}
