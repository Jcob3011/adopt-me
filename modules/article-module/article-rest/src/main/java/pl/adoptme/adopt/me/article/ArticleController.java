package pl.adoptme.adopt.me.article;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.adoptme.adopt.me.article.form.ArticleSaveForm;
import pl.adoptme.adopt.me.article.form.ArticleUpdateForm;
import pl.adoptme.adoptme.adoptme.common.rest.LoggedUser;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/article")
@RequiredArgsConstructor
class ArticleController {
    private final ArticleService articleService;
    private final LoggedUser loggedUser;
    private final ArticleDtoMapper mapper;


    @GetMapping("/all")
    public List<ArticleDto> getAllArticle(){
        List<String> ids = new ArrayList<>();
        return articleService
                .getAll(ids,false)
                .stream()
                .map(mapper::mapToArticleDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{articleId}")
    public ArticleDto getArticleById(@PathVariable String articleId){
        return mapper.mapToArticleDto(articleService.getById(articleId));
    }

    @GetMapping("/type/{typeName}")
    public List<ArticleDto> getArticleByType(@Valid @PathVariable("typeName") ArticleType type) {
        return articleService.getByType(type).stream()
                .map(mapper::mapToArticleDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ArticleDto savaArticle(@RequestBody ArticleSaveForm articleSaveForm) {
        return mapper.mapToArticleDto(articleService.save(articleSaveForm, loggedUser.getLoggedUserId()));
    }

    @PutMapping("/{articleId}")
    public void updateArticle(
            @RequestBody ArticleUpdateForm articleUpdateForm,
            @PathVariable String articleId) {
       articleService.update(articleUpdateForm, articleId, loggedUser.getLoggedUserId());
    }

    @DeleteMapping("/{articleId}")
    public void deleteArticle(@PathVariable String articleId) {
        articleService.delete(articleId, loggedUser.getLoggedUserId());
    }

    @PostMapping("search")
    public SearchResponse<ArticleDto> search(@RequestBody SearchForm form) {
        return articleService.search(form).map(mapper::mapToArticleDto);
    }

}
