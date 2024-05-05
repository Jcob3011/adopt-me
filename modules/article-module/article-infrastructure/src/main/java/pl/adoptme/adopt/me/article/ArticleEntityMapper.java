package pl.adoptme.adopt.me.article;

import pl.adoptme.adopt.me.article.entity.ArticleEntity;

class ArticleEntityMapper {
    static ArticleEntity mapToArticleEntity(Article article){
        return ArticleEntity.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .type(article.getType())
                .attachmentId(article.getAttachmentId())
                .createdById(article.getCreatedById())
                .createdOn(article.getCreatedOn())
                .updatedOn(article.getUpdatedOn())
                .deletedById(article.getDeletedById())
                .deletedOn(article.getDeletedOn())
                .build();
    }

    static Article mapToArticle(ArticleEntity articleEntity){
        return Article.builder()
                .id(articleEntity.getId())
                .title(articleEntity.getTitle())
                .content(articleEntity.getContent())
                .type(articleEntity.getType())
                .attachmentId(articleEntity.getAttachmentId())
                .createdById(articleEntity.getCreatedById())
                .createdOn(articleEntity.getCreatedOn())
                .updatedOn(articleEntity.getUpdatedOn())
                .deletedById(articleEntity.getDeletedById())
                .deletedOn(articleEntity.getDeletedOn())
                .build();
    }
}
