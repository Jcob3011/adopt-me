package pl.adoptme.adopt.me.tags;

public class TagDtoMapper {

    public static TagDto mapToDto(Tag tag) {
        if(tag == null) {
            return null;
        }
        return TagDto.builder()
                .id(tag.getId())
                .name(tag.getName())
                .createdOn(tag.getCreatedOn())
                .createdById(tag.getCreatedById())
                .updatedOn(tag.getUpdatedOn())
                .deletedOn(tag.getDeletedOn())
                .deletedById(tag.getDeletedById())
                .build();
    }
}

