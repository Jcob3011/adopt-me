package pl.adoptme.adoptme.common.domain.search;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import pl.adoptme.adoptme.common.domain.validation.EnumValidation;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchSort {
    @NotBlank
    private String by;
    @EnumValidation(enumClass = SortDirection.class, message = "{validation.invalid}")
    @NotBlank
    private String direction;
}