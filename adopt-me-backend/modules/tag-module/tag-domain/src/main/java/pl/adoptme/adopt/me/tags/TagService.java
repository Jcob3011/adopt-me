package pl.adoptme.adopt.me.tags;

import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.tags.form.TagSaveForm;
import pl.adoptme.adopt.me.tags.form.TagUpdateForm;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;

@Validated
public interface TagService {

    Tag save(@Valid TagSaveForm tagSaveForm, String createdById);

    void update(@Valid TagUpdateForm tagUpdateForm, String id);

    void delete(String id, String deletedById);

    Tag get(String id);

    Tag getOrNull(String id, boolean withDeleted);

    List<Tag> getAll(List<String> ids, boolean withDeleted);

    SearchResponse<Tag> search(SearchForm searchForm);

    Tag getByName(String name);

    Tag getByNameOrNull(String name);

    Tag saveIfNotPresent(@Valid TagSaveForm tagSaveForm, String createdById);
}
