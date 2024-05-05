package pl.adoptme.adopt.me.user.account.dto;


import pl.adoptme.adopt.me.attachment.Attachment;
import pl.adoptme.adopt.me.attachment.AttachmentDto;
import pl.adoptme.adopt.me.attachment.AttachmentDtoMapper;
import pl.adoptme.adopt.me.user.account.UserAccount;

public class UserAccountDtoMapper {

    public static UserAccountDto mapToDto(UserAccount userAccount, Attachment attachment) {
        AttachmentDto attachmentDto = attachment != null ?
                AttachmentDtoMapper.toDto(attachment) :
                null;

        return UserAccountDto.builder()
                .id(userAccount.getId())
                .firstName(userAccount.getFirstName())
                .lastName(userAccount.getLastName())
                .email(userAccount.getEmail())
                .role(userAccount.getRole())
                .status(userAccount.getStatus())
                .createdById(userAccount.getCreatedById())
                .createdOn(userAccount.getCreatedOn())
                .updatedOn(userAccount.getUpdatedOn())
                .deletedOn(userAccount.getDeletedOn())
                .deletedById(userAccount.getDeletedById())
                .attachment(attachmentDto)
                .build();
    }
}

