package pl.adoptme.adopt.me.tags;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.ActivityService;
import pl.adoptme.adopt.me.activities.form.add.AddTagForm;
import pl.adoptme.adopt.me.activities.form.remove.RemoveTagForm;
import pl.adoptme.adopt.me.tags.form.TagSaveForm;
import pl.adoptme.adopt.me.tags.form.TagUpdateForm;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static pl.adoptme.adopt.me.tags.TagMapper.createTag;

@Service
@RequiredArgsConstructor
class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final ActivityService activityService;


    @Override
    public Tag save(TagSaveForm tagSaveForm, String createdById) {
        Optional<Tag> tagOptional = tagRepository.getByName(tagSaveForm.getName());
        if (tagOptional.isPresent()) {
            throw new ApplicationException(ErrorCode.TAG_ALREADY_EXISTS_EXCEPTION);
        }
        Tag tag = createTag(tagSaveForm, createdById);
        activityService.save(new AddTagForm(createdById, tagSaveForm.getName()));
        return tagRepository.save(tag);
    }

    @Override
    public Tag get(String id) {
        Optional<Tag> tagOptional = tagRepository.get(id);
        if (tagOptional.isEmpty()) {
            throw new ApplicationException(ErrorCode.TAG_NOT_FOUND_EXCEPTION);
        }
        Tag tag = tagOptional.get();
        if (tag.getDeletedById() != null && tag.getDeletedOn() != null) {
            throw new ApplicationException(ErrorCode.TAG_NOT_FOUND_EXCEPTION);
        }
        return tag;
    }

    @Override
    public void update(TagUpdateForm tagUpdateForm, String id) {
        if (tagRepository.getByName(tagUpdateForm.getName()).isPresent()) {
            throw new ApplicationException(ErrorCode.TAG_ALREADY_EXISTS_EXCEPTION);
        }
        Tag tag = tagRepository.get(id).orElseThrow(() -> new ApplicationException(ErrorCode.TAG_NOT_FOUND_EXCEPTION));
        tag.setName(tagUpdateForm.getName());
        tag.setUpdatedOn(LocalDateTime.now());
        tagRepository.save(tag);
    }

    @Override
    public void delete(String id, String deletedById) {
        Tag tag = tagRepository.get(id).orElseThrow(() -> new ApplicationException(ErrorCode.TAG_NOT_FOUND_EXCEPTION));
        tag.setDeletedOn(LocalDateTime.now());
        tag.setDeletedById(deletedById);
        activityService.save(new RemoveTagForm(deletedById, id));
        tagRepository.save(tag);
    }

    @Override
    public Tag getOrNull(String id, boolean withDeleted) {
        if(id == null) {
            return null;
        }
        Optional<Tag> tagOptional = tagRepository.get(id);
        if (tagOptional.isEmpty()) {
            return null;
        }
        Tag tag = tagOptional.get();
        if (!withDeleted && tag.getDeletedById() != null) {
            return null;
        }
        return tag;
    }

    @Override
    public List<Tag> getAll(List<String> ids, boolean withDeleted) {
        return tagRepository.get(ids, withDeleted);
    }

    @Override
    public SearchResponse<Tag> search(SearchForm searchForm) {
        return tagRepository.search(searchForm);
    }

    @Override
    public Tag getByName(String name) {
        Optional<Tag> tag = tagRepository.getByName(name);
        return tag.orElse(null);
    }

    @Override
    public Tag saveIfNotPresent(TagSaveForm tagSaveForm, String createdById) {
        if (tagRepository.getByName(tagSaveForm.getName()).isEmpty()) {
            return null;
        }
        Tag tag = createTag(tagSaveForm, createdById);
        return tagRepository.save(tag);
    }

    @Override
    public Tag getByNameOrNull(String name) {
        Optional<Tag> tag = tagRepository.getByName(name);
        return tag.orElse(null);
    }
}
