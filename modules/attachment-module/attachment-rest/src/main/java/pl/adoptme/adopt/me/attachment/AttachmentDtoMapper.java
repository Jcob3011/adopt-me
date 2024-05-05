package pl.adoptme.adopt.me.attachment;


public class AttachmentDtoMapper {
    public static AttachmentDto toDto(Attachment attachment) {
        return AttachmentDto.builder()
                .id(attachment.getId())
                .originalFileName(attachment.getOriginalFileName())
                .name(attachment.getName())
                .description(attachment.getDescription())
                .size(attachment.getSize())
                .extension(attachment.getExtension())
                .createdById(attachment.getCreatedById())
                .createdOn(attachment.getCreatedOn())
                .deletedById(attachment.getDeletedById())
                .deletedOn(attachment.getDeletedOn())
                .build();
    }
}

