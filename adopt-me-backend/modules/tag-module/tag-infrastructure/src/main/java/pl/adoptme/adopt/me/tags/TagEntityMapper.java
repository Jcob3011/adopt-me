package pl.adoptme.adopt.me.tags;

import org.springframework.stereotype.Component;

@Component
class TagEntityMapper {

    static TagEntity mapToTagsEntity(Tag tag) {
        return TagEntity.builder()
                .id(tag.getId())
                .name(tag.getName())
                .createdOn(tag.getCreatedOn())
                .createdById(tag.getCreatedById())
                .updatedOn(tag.getUpdatedOn())
                .deletedOn(tag.getDeletedOn())
                .deletedById(tag.getDeletedById())
                .build();
    }


    static Tag mapToTags(TagEntity tagEntity) {
        return Tag.builder()
                .id(tagEntity.getId())
                .name(tagEntity.getName())
                .createdOn(tagEntity.getCreatedOn())
                .createdById(tagEntity.getCreatedById())
                .updatedOn(tagEntity.getUpdatedOn())
                .deletedOn(tagEntity.getDeletedOn())
                .deletedById(tagEntity.getDeletedById())
                .build();
    }
}
