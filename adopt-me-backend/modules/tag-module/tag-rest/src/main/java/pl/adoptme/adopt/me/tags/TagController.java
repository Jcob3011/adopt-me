package pl.adoptme.adopt.me.tags;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.adoptme.adopt.me.tags.form.TagSaveForm;
import pl.adoptme.adopt.me.tags.form.TagUpdateForm;
import pl.adoptme.adoptme.adoptme.common.rest.LoggedUser;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.tags.TagDtoMapper.mapToDto;

@RestController
@RequestMapping("tag")
@RequiredArgsConstructor
class TagController {

    private final TagService tagService;
    private final LoggedUser loggedUser;

    @PostMapping("/search")
    public SearchResponse<TagDto> search(@RequestBody SearchForm searchForm) {
        return tagService.search(searchForm).map(TagDtoMapper::mapToDto);
    }

    @GetMapping
    public List<TagDto> get(@RequestParam("ids") List<String> ids, boolean withDeleted) {
        return tagService.getAll(ids, withDeleted).stream().map(TagDtoMapper::mapToDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public TagDto get(@PathVariable String id) {
        return mapToDto(tagService.get(id));
    }

    @PostMapping
    public TagDto save(@RequestBody TagSaveForm tagSaveForm) {
        return mapToDto(tagService.save(tagSaveForm, loggedUser.getLoggedUserId()));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        tagService.delete(id, loggedUser.getLoggedUserId());
    }

    @PutMapping("/{id}")
    public void update(@RequestBody TagUpdateForm tagUpdateForm, @PathVariable String id) {
        tagService.update(tagUpdateForm, id);
    }
}