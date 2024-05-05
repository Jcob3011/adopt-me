package pl.adoptme.adopt.me.user.acount.activate.account.token;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "activate_account_token")
public class ActivateAccountTokenEntity {
    @Id
    private String id;
    private String userId;
    private LocalDateTime expirationDate;
    private boolean used;
}
