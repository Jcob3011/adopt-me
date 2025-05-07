package pl.adoptme.adopt.me.attachment;

import java.util.List;
import java.util.Optional;

interface AttachmentRepository {
    Attachment save(Attachment attachment);
    Attachment getOrNull(String id, boolean withDeleted);
    Attachment get(String id);
    List<Attachment> get(List<String> ids, boolean withDeleted);
}
