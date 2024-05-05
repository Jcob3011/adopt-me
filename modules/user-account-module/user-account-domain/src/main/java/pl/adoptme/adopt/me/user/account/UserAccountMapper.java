package pl.adoptme.adopt.me.user.account;


import pl.adoptme.adopt.me.user.account.form.UserAccountSaveForm;

import java.time.LocalDateTime;


import static pl.adoptme.adopt.me.user.account.UserAccountStatus.INACTIVE;


class UserAccountMapper {

    static UserAccount createUserAccount(
            UserAccountSaveForm userAccountSaveForm,
            String userId, String createdById, String attachmentId) {
        return UserAccount.builder()
                .id(userId)
                .firstName(userAccountSaveForm.getFirstName())
                .lastName(userAccountSaveForm.getLastName())
                .email(userAccountSaveForm.getEmail())
                .status(INACTIVE)
                .role(UserAccountRole.valueOf(userAccountSaveForm.getRole().toUpperCase()))
                .createdById(createdById)
                .createdOn(LocalDateTime.now())
                .updatedOn(LocalDateTime.now())
                .deletedOn(null)
                .deletedById(null)
                .attachmentId(attachmentId)
                .build();
    }
}
