package pl.adoptme.adopt.me.article;

import pl.adoptme.adopt.me.article.form.ArticleSaveForm;

import java.time.LocalDateTime;
import java.util.UUID;

class ArticleFormMapper {
    static Article createArticle(ArticleSaveForm articleSaveForm, String createdById){
        String id= UUID.randomUUID().toString();
        return Article.builder()
                .id(id)
                .title(articleSaveForm.getTitle())
                .content(articleSaveForm.getContent())
                .type(ArticleType.valueOf(articleSaveForm.getType()))
                .attachmentId(articleSaveForm.getAttachmentId())
                .createdOn(LocalDateTime.now())
                .createdById(createdById)
                .updatedOn(LocalDateTime.now())
                .deletedOn(null)
                .deletedById(null)
                .build();
    }
}
