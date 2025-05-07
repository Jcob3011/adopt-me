package pl.adoptme.adopt.me.user.account;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserAccount {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private UserAccountStatus status;
    private UserAccountRole role;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;
    private String attachmentId;
}
