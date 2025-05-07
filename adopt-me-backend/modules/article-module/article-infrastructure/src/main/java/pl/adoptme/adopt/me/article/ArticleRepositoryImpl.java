package pl.adoptme.adopt.me.article;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.adoptme.adopt.me.article.entity.ArticleEntity;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.article.ArticleEntityMapper.mapToArticle;
import static pl.adoptme.adopt.me.article.ArticleEntityMapper.mapToArticleEntity;
import static pl.adoptme.adoptme.adoptme.common.infrastructure.SearchUtils.createSearchResponse;


@Repository
@RequiredArgsConstructor
@Transactional
public class ArticleRepositoryImpl implements ArticleRepository {

    private final ArticleRepositoryJpa articleRepositoryJpa;

    private final List<String> filterList = new ArrayList<>(Arrays.asList(
            "deletedById",
            "deletedOn",
            "createdById",
            "createdOn",
            "attachmentId",
            "type",
            "content",
            "title",
            "id"));

    @Override
    public List<Article> getAll() {
        return articleRepositoryJpa.findAll().stream().map(ArticleEntityMapper::mapToArticle)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Article> get(String id) {
        return articleRepositoryJpa.findById(id)
                .map(ArticleEntityMapper::mapToArticle);
    }

    @Override
    public Optional<Article> get(String id, boolean withDeleted) {
        return articleRepositoryJpa.findById(id)
                .map(ArticleEntityMapper::mapToArticle)
                .filter(attachment -> {
                    if (withDeleted){
                        return true;
                    } else {
                        return attachment.getDeletedById() == null;
                    }
                });
    }

    @Override
    public Article getById(String id) {
        Optional<ArticleEntity> articleEntityOptional = articleRepositoryJpa.findById(id);
        if(articleEntityOptional.isEmpty()) {
            throw new ApplicationException(ErrorCode.ARTICLE_NOT_FOUND_EXCEPTION);
        }
        ArticleEntity articleEntity = articleEntityOptional.get();
        return mapToArticle(articleEntity);
        }


    @Override
    public List<Article> getByType(ArticleType articleType) {
        return articleRepositoryJpa.findByType(articleType).stream()
                .map(ArticleEntityMapper::mapToArticle).collect(Collectors.toList());
    }

    @Override
    public Article save(Article article) {
        articleRepositoryJpa.save(mapToArticleEntity(article));
        return article;
    }

    @Override
    public SearchResponse<Article> search(SearchForm searchForm) {
        return createSearchResponse(articleRepositoryJpa, searchForm, filterList, ArticleEntityMapper::mapToArticle);
    }

    @Override
    public List<Article> get(List<String> articleId, boolean withDeleted) {
        return articleRepositoryJpa.findByIdIn(articleId)
                .stream()
                .map(ArticleEntityMapper::mapToArticle)
                .filter(article -> {
                    if(withDeleted){
                        return true;
                    } else {
                        return article.getDeletedById() == null;
                    }
                })
                .collect(Collectors.toList());
    }
}
