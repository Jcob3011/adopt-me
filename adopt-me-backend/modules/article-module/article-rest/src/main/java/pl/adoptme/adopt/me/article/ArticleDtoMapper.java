package pl.adoptme.adopt.me.article;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor

public class ArticleDtoMapper {

    public ArticleDto mapToArticleDto(Article article){
        return ArticleDto.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .type(article.getType())
                .attachmentId(article.getAttachmentId())
                .createdOn(article.getCreatedOn())
                .createdById(article.getCreatedById())
                .updatedOn(article.getUpdatedOn())
                .deletedOn(article.getDeletedOn())
                .deletedById(article.getDeletedById())
                .build();
    }
}
