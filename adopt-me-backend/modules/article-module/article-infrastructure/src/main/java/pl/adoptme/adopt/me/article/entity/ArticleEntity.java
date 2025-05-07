package pl.adoptme.adopt.me.article.entity;

import jakarta.persistence.*;
import lombok.*;
import pl.adoptme.adopt.me.article.ArticleType;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "article")
public class ArticleEntity {

    @Id
    private String id;
    private String title;
    private String content;
    @Enumerated(EnumType.STRING)
    private ArticleType type;
    private String attachmentId;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;
}
