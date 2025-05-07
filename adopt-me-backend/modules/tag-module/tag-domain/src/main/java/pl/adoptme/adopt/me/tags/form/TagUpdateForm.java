package pl.adoptme.adopt.me.tags.form;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagUpdateForm {
    @NotBlank(message = "Name is mandatory")
    private String name;

}
