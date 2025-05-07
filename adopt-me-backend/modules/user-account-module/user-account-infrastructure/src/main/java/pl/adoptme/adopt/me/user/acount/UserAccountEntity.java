package pl.adoptme.adopt.me.user.acount;


import jakarta.persistence.*;
import lombok.*;
import pl.adoptme.adopt.me.user.account.UserAccountRole;
import pl.adoptme.adopt.me.user.account.UserAccountStatus;

import java.time.LocalDateTime;

import static jakarta.persistence.EnumType.STRING;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_account")
public class UserAccountEntity {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    @Enumerated(STRING)
    private UserAccountStatus status;
    @Enumerated(STRING)
    private UserAccountRole role;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;
    private String attachmentId;
}

