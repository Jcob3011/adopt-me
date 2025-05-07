package pl.adoptme.adopt.me.user.account.activate.account.token;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ActivateAccountToken {
    private String id;
    private String userId;
    private LocalDateTime expirationDate;
    private boolean used;
}
