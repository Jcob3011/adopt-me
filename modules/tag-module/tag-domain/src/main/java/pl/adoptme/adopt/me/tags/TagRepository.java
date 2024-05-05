package pl.adoptme.adopt.me.tags;

import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;
import java.util.Optional;

interface TagRepository {

    Tag save(Tag tag);

    Optional<Tag> get(String id);

    Optional<Tag> get(String id, boolean withDeleted);

    List<Tag> get(List<String> ids, boolean withDeleted);

    SearchResponse<Tag> search(SearchForm searchForm);
    Optional<Tag> getByName(String name);
    Tag saveIfNotPresent(Tag tag);
}
