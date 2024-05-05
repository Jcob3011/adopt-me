package pl.adoptme.adopt.me.article;


import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Article {

    private String id;
    private String title;
    private String content;
    private ArticleType type;
    private String attachmentId;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;

}
