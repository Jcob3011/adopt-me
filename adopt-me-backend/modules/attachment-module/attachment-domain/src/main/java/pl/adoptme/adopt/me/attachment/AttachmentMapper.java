package pl.adoptme.adopt.me.attachment;


import pl.adoptme.adopt.me.attachment.dto.AttachmentCreateForm;

import java.util.UUID;

import static pl.adoptme.adopt.me.attachment.AttachmentUtils.getExtension;


class AttachmentMapper {
    public static Attachment toAttachment(AttachmentCreateForm attachmentCreateForm) {
        return Attachment.builder()
                .id(UUID.randomUUID().toString())
                .originalFileName(attachmentCreateForm.getOriginalFileName())
                .name(attachmentCreateForm.getName())
                .description(attachmentCreateForm.getDescription())
                .size((attachmentCreateForm.getSize()))
                .extension(getExtension(attachmentCreateForm.getOriginalFileName()))
                .createdById(attachmentCreateForm.getCreatedById())
                .createdOn(attachmentCreateForm.getCreatedOn())
                .deletedById(null)
                .deletedOn(null)
                .build();
    }
}
