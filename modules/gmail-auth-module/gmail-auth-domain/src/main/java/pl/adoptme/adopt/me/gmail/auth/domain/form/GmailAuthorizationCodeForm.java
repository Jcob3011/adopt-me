package pl.adoptme.adopt.me.gmail.auth.domain.form;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GmailAuthorizationCodeForm {

    @NotBlank(message = "{validation.empty}")
    private String code;
}
