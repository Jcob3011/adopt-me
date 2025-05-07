package pl.adoptme.adopt.me.user.account.form;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAccountImage {
    private String name;
    private String imageBase64;
}

