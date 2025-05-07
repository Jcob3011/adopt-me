package pl.adoptme.adopt.me.animal;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import pl.adoptme.adopt.me.tags.TagDto;
import pl.adoptme.adopt.me.tags.TagService;

import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.tags.TagDtoMapper.mapToDto;

@Component
@AllArgsConstructor
public class AnimalDtoMapper {
    private final TagService tagService;

    public AnimalDto mapToAnimalDto(Animal animal){
        Set<TagDto> tags = animal.getTags().stream()
                .map(tag -> mapToDto(tagService.getByNameOrNull(tag)))
                .filter(Objects::nonNull).collect(Collectors.toSet());
        return AnimalDto.builder()
                .id(animal.getId())
                .name(animal.getName())
                .age(animal.getAge())
                .attachmentId(animal.getAttachmentId())
                .type(animal.getType())
                .breed(animal.getBreed())
                .color(animal.getColor())
                .hair(animal.getHair())
                .size(animal.getSize())
                .tags(tags)
                .healthBooklet(animal.getHealthNotDeleted())
                .town(animal.getTown())
                .contact(animal.getContact())
                .createdById(animal.getCreatedById())
                .createdOn(animal.getCreatedOn())
                .updateOn(animal.getUpdateOn())
                .deletedOn(animal.getDeletedOn())
                .deletedById(animal.getDeletedById())
                .build();
    }
}
