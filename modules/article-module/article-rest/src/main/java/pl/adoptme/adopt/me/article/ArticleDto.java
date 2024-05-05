package pl.adoptme.adopt.me.article;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@Builder
public class ArticleDto {
    private String id;
    private String title;
    private String content;
    private String attachmentId;
    private ArticleType type;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;
}
