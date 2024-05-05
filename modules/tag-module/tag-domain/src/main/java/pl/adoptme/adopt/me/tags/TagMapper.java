package pl.adoptme.adopt.me.tags;

import pl.adoptme.adopt.me.tags.form.TagSaveForm;

import java.time.LocalDateTime;
import java.util.UUID;

class TagMapper {

    static Tag createTag(TagSaveForm tagSaveForm, String createdById) {
        return Tag.builder()
                .id(UUID.randomUUID().toString())
                .name(tagSaveForm.getName())
                .createdOn(LocalDateTime.now())
                .createdById(createdById)
                .updatedOn(LocalDateTime.now())
                .deletedOn(null)
                .deletedById(null)
                .build();
    }
}
