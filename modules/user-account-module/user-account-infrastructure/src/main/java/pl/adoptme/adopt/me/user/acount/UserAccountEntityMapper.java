package pl.adoptme.adopt.me.user.acount;


import pl.adoptme.adopt.me.user.account.UserAccount;

class UserAccountEntityMapper {

    static UserAccountEntity mapToUserAccountEntity(UserAccount userAccount) {
        return UserAccountEntity.builder()
                .id(userAccount.getId())
                .firstName(userAccount.getFirstName())
                .lastName(userAccount.getLastName())
                .email(userAccount.getEmail())
                .status(userAccount.getStatus())
                .role(userAccount.getRole())
                .createdOn(userAccount.getCreatedOn())
                .createdById(userAccount.getCreatedById())
                .updatedOn(userAccount.getUpdatedOn())
                .deletedOn(userAccount.getDeletedOn())
                .deletedById(userAccount.getDeletedById())
                .attachmentId(userAccount.getAttachmentId())
                .build();
    }

    static UserAccount mapToUserAccount(UserAccountEntity userAccountEntity) {
        return UserAccount.builder()
                .id(userAccountEntity.getId())
                .firstName(userAccountEntity.getFirstName())
                .lastName(userAccountEntity.getLastName())
                .email(userAccountEntity.getEmail())
                .status(userAccountEntity.getStatus())
                .role(userAccountEntity.getRole())
                .createdOn(userAccountEntity.getCreatedOn())
                .createdById(userAccountEntity.getCreatedById())
                .updatedOn(userAccountEntity.getUpdatedOn())
                .deletedOn(userAccountEntity.getDeletedOn())
                .deletedById(userAccountEntity.getDeletedById())
                .attachmentId(userAccountEntity.getAttachmentId())
                .build();
    }
}
