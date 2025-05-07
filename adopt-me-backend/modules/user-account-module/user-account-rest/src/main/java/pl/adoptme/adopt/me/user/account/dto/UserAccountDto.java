package pl.adoptme.adopt.me.user.account.dto;



import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import pl.adoptme.adopt.me.attachment.AttachmentDto;
import pl.adoptme.adopt.me.user.account.UserAccountRole;
import pl.adoptme.adopt.me.user.account.UserAccountStatus;


import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UserAccountDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private UserAccountRole role;
    private UserAccountStatus status;
    private String createdById;
    private LocalDateTime createdOn;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;
    private AttachmentDto attachment;
}
