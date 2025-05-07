package pl.adoptme.adopt.me.article.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import pl.adoptme.adopt.me.article.ArticleType;
import pl.adoptme.adoptme.common.domain.validation.EnumValidation;

import java.util.Set;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleSaveForm {

    @NotBlank(message = "{validation.empty}")
    private String title;

    @NotBlank(message = "{validation.empty}")
    private String content;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(
            enumClass = ArticleType.class,
            message = "{validation.invalid}"
    )
    private String type;

    private String attachmentId;
}
