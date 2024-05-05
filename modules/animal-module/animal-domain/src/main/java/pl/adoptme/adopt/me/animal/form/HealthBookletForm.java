package pl.adoptme.adopt.me.animal.form;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HealthBookletForm {
    private String id;

    private String sex;

    @NotNull(message = "Correct is mandatory")
    private Boolean health;

    private String description;

    private LocalDateTime admitted;
}
