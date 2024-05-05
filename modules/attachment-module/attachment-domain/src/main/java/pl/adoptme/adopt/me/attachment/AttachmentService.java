package pl.adoptme.adopt.me.attachment;


import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.attachment.dto.AttachmentCreateForm;
import pl.adoptme.adopt.me.attachment.dto.BytesWithExtension;


import java.util.List;

@Validated
public interface AttachmentService {
    Attachment get(String id);
    List<Attachment> getAll(List<String> ids, boolean withDeleted);
    Attachment getOrNull(String id, boolean withDeleted);
    Attachment save(@Valid AttachmentCreateForm attachmentCreateForm);
    void delete(String id, String deletedById);
    BytesWithExtension download(String id);
}
