package pl.adoptme.adopt.me.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pl.adoptme.adopt.me.article.entity.ArticleEntity;

import java.util.List;

public interface ArticleRepositoryJpa extends JpaRepository<ArticleEntity, String>, JpaSpecificationExecutor<ArticleEntity> {
    List<ArticleEntity> findByType(ArticleType articleType);

    List<ArticleEntity> findByIdIn(List<String> articleId);
}
