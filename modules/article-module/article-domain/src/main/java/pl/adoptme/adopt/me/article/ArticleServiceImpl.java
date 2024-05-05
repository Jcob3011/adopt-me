package pl.adoptme.adopt.me.article;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.ActivityService;
import pl.adoptme.adopt.me.activities.form.remove.RemoveArticleForm;
import pl.adoptme.adopt.me.activities.form.update.UpdateArticleForm;
import pl.adoptme.adopt.me.article.form.ArticleSaveForm;
import pl.adoptme.adopt.me.article.form.ArticleUpdateForm;
import pl.adoptme.adopt.me.attachment.AttachmentService;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    private final AttachmentService attachmentService;
    private final ActivityService activityService;



    @Override
    public List<Article> getAll(List<String> articleId, boolean withDeleted) {
        return articleRepository.get(articleId, withDeleted);
    }

    @Override
    public Article getById(String articleId) {
        return articleRepository.getById(articleId);
    }

    @Override
    public List<Article> getByType(ArticleType articleType) {
        return articleRepository.getByType(articleType);
    }

    @Override
    public Article save(ArticleSaveForm articleSaveForm, String createdById) {
        Article article = ArticleFormMapper.createArticle(articleSaveForm, createdById);
        articleRepository.save(article);
        return article;
    }

    @Override
    public void update(ArticleUpdateForm form, String id, String createdById) {
        Article article = articleRepository.getById(id);
        article.setTitle(form.getTitle());
        article.setContent(form.getContent());
        article.setType(ArticleType.valueOf(form.getType()));

        String currentAttachmentId = article.getAttachmentId();
        if (currentAttachmentId != null && !currentAttachmentId.equals(form.getAttachmentId())) {
            attachmentService.delete(article.getAttachmentId(), createdById);
        }
        article.setAttachmentId(form.getAttachmentId());
        articleRepository.save(article);
        activityService.save(new UpdateArticleForm(createdById, id));
    }

    @Override
    public void delete(String articleId, String deleteById) {
        Article article = articleRepository.getById(articleId);
        article.setDeletedOn(LocalDateTime.now());
        article.setDeletedById(deleteById);
        articleRepository.save(article);
        activityService.save(new RemoveArticleForm(deleteById, articleId));

    }

    @Override
    public SearchResponse<Article> search(SearchForm searchForm) {
        return articleRepository.search(searchForm);
    }
}
