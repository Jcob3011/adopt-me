package pl.adoptme.adopt.me.article;

import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;
import java.util.Optional;

interface ArticleRepository {

    List<Article> getAll();

    Optional<Article> get(String id);

    Optional<Article> get(String id, boolean withDeleted);

    Article getById(String id);

    List<Article>  getByType(ArticleType articleType);

    Article save(Article article);

    SearchResponse<Article> search(SearchForm searchForm);

    List<Article> get(List<String> articleId, boolean withDeleted);
}
