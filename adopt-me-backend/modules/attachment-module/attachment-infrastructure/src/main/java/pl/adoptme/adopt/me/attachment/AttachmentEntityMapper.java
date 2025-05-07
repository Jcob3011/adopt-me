package pl.adoptme.adopt.me.attachment;


import org.springframework.stereotype.Component;

@Component
class AttachmentEntityMapper {
    public static Attachment toAttachment(AttachmentEntity attachmentEntity) {
        return Attachment.builder()
                .id(attachmentEntity.getId())
                .originalFileName(attachmentEntity.getOriginalFileName())
                .name(attachmentEntity.getName())
                .description(attachmentEntity.getDescription())
                .path(attachmentEntity.getPath())
                .size(attachmentEntity.getSize())
                .extension(attachmentEntity.getExtension())
                .createdById(attachmentEntity.getCreatedById())
                .createdOn(attachmentEntity.getCreatedOn())
                .deletedById(attachmentEntity.getDeletedById())
                .deletedOn(attachmentEntity.getDeletedOn())
                .build();
    }

    public static AttachmentEntity toEntity(Attachment attachment) {
        return AttachmentEntity.builder()
                .id(attachment.getId())
                .originalFileName(attachment.getOriginalFileName())
                .name(attachment.getName())
                .description(attachment.getDescription())
                .path(attachment.getPath())
                .size(attachment.getSize())
                .extension(attachment.getExtension())
                .createdById(attachment.getCreatedById())
                .createdOn(attachment.getCreatedOn())
                .deletedById(attachment.getDeletedById())
                .deletedOn(attachment.getDeletedOn())
                .build();
    }
}
