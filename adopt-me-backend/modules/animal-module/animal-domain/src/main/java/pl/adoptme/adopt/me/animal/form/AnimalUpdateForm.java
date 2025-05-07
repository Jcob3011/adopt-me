package pl.adoptme.adopt.me.animal.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import pl.adoptme.adopt.me.animal.*;
import pl.adoptme.adoptme.common.domain.validation.EnumValidation;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class AnimalUpdateForm {
    @NotBlank(message = "{validation.empty}")
    private String name;

    @NotBlank(message = "{validation.empty}")
    private String age;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(
            enumClass = AnimalType.class,
            message = "{validation.invalid}"
    )
    private String type;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(
            enumClass = AnimalBreed.class,
            message = "{validation.invalid}"
    )
    private String breed;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(
            enumClass = AnimalColor.class,
            message = "{validation.invalid}"
    )
    private String color;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(
            enumClass = AnimalHair.class,
            message = "{validation.invalid}"
    )
    private String  hair;

    @NotBlank(message = "{validation.empty}")
    @EnumValidation(
            enumClass = AnimalSize.class,
            message = "{validation.invalid}"
    )
    private String size;

    @NotEmpty(message = "{validation.empty}")
    private Set<String> tags;

    @NotEmpty(message = "{validation.empty}")
    private String town;

    @NotEmpty(message = "{validation.empty}")
    private String contact;

    private List<HealthBookletForm> healthBooklet;
    public List<String> healthBookletToDelete;

    private String attachmentId;

}
