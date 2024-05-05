package pl.adoptme.adopt.me.article;

import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.article.form.ArticleSaveForm;
import pl.adoptme.adopt.me.article.form.ArticleUpdateForm;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;

@Validated
public interface ArticleService {

    List<Article> getAll(List<String> articleId, boolean withDeleted);

    Article getById(String articleId);

   List<Article> getByType(ArticleType type);

    Article save(@Valid ArticleSaveForm articleSaveForm, String createdById);

    void update(@Valid ArticleUpdateForm articleUpdateForm, String id, String createdById);

    void delete(String articleId, String deleteById);

    SearchResponse<Article> search(SearchForm searchForm);

}
