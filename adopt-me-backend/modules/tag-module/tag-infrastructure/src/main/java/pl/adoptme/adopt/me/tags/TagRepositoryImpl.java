package pl.adoptme.adopt.me.tags;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.tags.TagEntityMapper.mapToTagsEntity;
import static pl.adoptme.adoptme.adoptme.common.infrastructure.SearchUtils.createSearchResponse;

@Repository
@RequiredArgsConstructor
class TagRepositoryImpl implements TagRepository {

    private final TagRepositoryJpa tagRepositoryJpa;
    private final List<String> filterList = new ArrayList<>(Arrays.asList("deletedById", "deletedOn", "createdById", "createdOn", "name", "id"));


    @Override
    public Tag save(Tag tag) {
        tagRepositoryJpa.save(mapToTagsEntity(tag));
        return tag;
    }

    @Override
    public Optional<Tag> get(String id) {
        return tagRepositoryJpa.findById(id).map(TagEntityMapper::mapToTags);
    }

    @Override
    public Optional<Tag> get(String id, boolean withDeleted) {
        return tagRepositoryJpa.findById(id).map(TagEntityMapper::mapToTags)
                .filter(tag -> {
                    if(withDeleted) {
                        return true;
                    } else {
                        return tag.getDeletedById() == null;
                    }
                });
    }

    @Override
    public List<Tag> get(List<String> ids, boolean withDeleted) {
        return tagRepositoryJpa.findByIdIn(ids)
                .stream()
                .map(TagEntityMapper::mapToTags)
                .filter(tag -> {
                    if(withDeleted) {
                        return true;
                    } else {
                        return tag.getDeletedById() == null;
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public SearchResponse<Tag> search(SearchForm searchForm) {
        return createSearchResponse(tagRepositoryJpa, searchForm, filterList, TagEntityMapper::mapToTags);
    }

    @Override
    public Optional<Tag> getByName(String name) {
        return tagRepositoryJpa.findByNameIgnoreCaseAndDeletedByIdNull(name).map(TagEntityMapper::mapToTags);
    }

    @Override
    public Tag saveIfNotPresent(Tag tag) {
        if (tagRepositoryJpa.findByNameIgnoreCaseAndDeletedByIdNull(tag.getName()).isEmpty()) {
            return null;
        }
        tagRepositoryJpa.save(mapToTagsEntity(tag));
        return tag;
    }
}
