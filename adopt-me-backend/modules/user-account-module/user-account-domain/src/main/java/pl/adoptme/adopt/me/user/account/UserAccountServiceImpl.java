package pl.adoptme.adopt.me.user.account;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.adoptme.adopt.me.activities.ActivityService;
import pl.adoptme.adopt.me.activities.form.add.AddUserForm;
import pl.adoptme.adopt.me.activities.form.remove.RemoveUserForm;
import pl.adoptme.adopt.me.attachment.Attachment;
import pl.adoptme.adopt.me.attachment.AttachmentService;
import pl.adoptme.adopt.me.attachment.dto.AttachmentCreateForm;
import pl.adoptme.adopt.me.notification.NotificationService;
import pl.adoptme.adopt.me.notification.dto.NotificationForm;
import pl.adoptme.adopt.me.notification.dto.RegistrationForm;
import pl.adoptme.adopt.me.user.account.activate.account.token.ActivateAccountToken;
import pl.adoptme.adopt.me.user.account.activate.account.token.ActivateAccountTokenConfig;
import pl.adoptme.adopt.me.user.account.activate.account.token.ActivateAccountTokenRepository;
import pl.adoptme.adopt.me.user.account.activate.account.token.form.ActivateAccountForm;
import pl.adoptme.adopt.me.user.account.activate.account.token.form.ActivateAccountNotificationForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountImage;
import pl.adoptme.adopt.me.user.account.form.UserAccountSaveForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountSelfUpdateForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountUpdateForm;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.FrontendConfig;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;


import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.user.account.UserAccountMapper.createUserAccount;
import static pl.adoptme.adopt.me.user.account.UserAccountStatus.ACTIVE;
import static pl.adoptme.adopt.me.user.account.UserAccountStatus.DELETED;
import static pl.adoptme.adoptme.common.domain.ErrorCode.*;


@Service
@RequiredArgsConstructor
class UserAccountServiceImpl implements UserAccountService {

    private final UserAccountRepository userAccountRepository;
    private final ActivateAccountTokenConfig activateAccountTokenConfig;
    private final ActivateAccountTokenRepository activateAccountTokenRepository;
    private final NotificationService notificationService;
    private final AttachmentService attachmentService;
    private final FrontendConfig frontendConfig;
    private final ActivityService activityService;

    @Override
    public UserAccount save(UserAccountSaveForm form, String createdById) {
        if (userAccountRepository.getByEmail(form.getEmail()).isPresent()) {
            throw new ApplicationException(USER_ALREADY_EXISTS);
        }

        String attachmentId = null;
        String userAccountId = UUID.randomUUID().toString();
        if (form.getAttachment() != null) {
            UserAccountImage attachment = form.getAttachment();
            byte[] image = Base64.getDecoder().decode(attachment.getImageBase64());
            AttachmentCreateForm attachmentForm = AttachmentCreateForm.builder()
                    .originalFileName(attachment.getName())
                    .name(attachment.getName())
                    .description(attachment.getName())
                    .image(image)
                    .size((long) image.length)
                    .createdById(userAccountId)
                    .createdOn(LocalDateTime.now())
                    .build();
            Attachment savedAttachment = attachmentService.save(attachmentForm);
            attachmentId = savedAttachment.getId();
        }

        UserAccount userAccount = createUserAccount(form, userAccountId, createdById, attachmentId);
        activityService.save(new AddUserForm(createdById, form.getEmail()));
        return userAccountRepository.save(userAccount);
    }

    @Override
    public UserAccount getOrNull(String id, boolean withDeleted) {
        if (id == null) {
            return null;
        }

        Optional<UserAccount> userAccountOpt = userAccountRepository.getById(id);
        if (userAccountOpt.isEmpty()) {
            return null;
        }

        UserAccount userAccount = userAccountOpt.get();
        if (!withDeleted && userAccount.getDeletedOn() != null) {
            return null;
        }
        return userAccount;
    }

    @Override
    public List<UserAccount> getAll(List<String> ids, boolean withDeleted) {
        List<UserAccount> userAccounts = userAccountRepository.getAll().stream()
                .filter(userAccount -> ids.contains(userAccount.getId()))
                .collect(Collectors.toList());

        if (!withDeleted) {
            userAccounts.removeIf(userAccount -> userAccount.getDeletedOn() != null);
        }
        return userAccounts;
    }

    @Override
    public List<UserAccount> getAll() {
        return userAccountRepository.getAll();
    }

    @Override
    public UserAccount get(String userId) {
        if (userId == null) {
            throw new ApplicationException(USER_NOT_FOUND_EXCEPTION);
        }
        UserAccount userAccount = userAccountRepository.getById(userId)
                .orElseThrow(() -> new ApplicationException(USER_NOT_FOUND_EXCEPTION));

        if(userAccount.getStatus().equals(DELETED)) {
            throw new ApplicationException(USER_NOT_FOUND_EXCEPTION);
        }
        return userAccount;
    }

    @Override
    public void sendNotificationToActiveAccount(ActivateAccountNotificationForm form) {
        UserAccount userAccount = userAccountRepository.getByEmail(form.getEmail())
                .orElseThrow(() -> new ApplicationException(USER_NOT_FOUND_EXCEPTION));

        if (userAccount.getStatus().equals(ACTIVE)) {
            throw new ApplicationException(USER_STATUS_ALREADY_ACTIVATED_EXCEPTION);
        }

        LocalDateTime tokenExpirationTime = LocalDateTime.now().plusHours(
                activateAccountTokenConfig.getExpirationTime()
        );

        ActivateAccountToken generatedToken = ActivateAccountToken.builder()
                .id(UUID.randomUUID().toString())
                .userId(userAccount.getId())
                .expirationDate(tokenExpirationTime)
                .used(false)
                .build();

        activateAccountTokenRepository.save(generatedToken);

        String activateAccountUrl = frontendConfig.getActivateAccountUrl() + "/" + generatedToken.getId();
        NotificationForm notificationForm = new RegistrationForm(
                userAccount.getEmail(),
                userAccount.getFirstName(),
                userAccount.getLastName(),
                activateAccountUrl
        );

        notificationService.send(notificationForm, userAccount.getId());
    }

    @Override
    public void activateAccount(ActivateAccountForm form) {
        validateToken(new ActivateAccountForm(form.getToken()));
        ActivateAccountToken token = activateAccountTokenRepository.getById(form.getToken())
                .orElseThrow(() -> new ApplicationException(ACTIVATE_ACCOUNT_TOKEN_NOT_FOUND_EXCEPTION));

        UserAccount userAccount = userAccountRepository.getById(token.getUserId())
                .orElseThrow(() -> new ApplicationException(USER_NOT_FOUND_EXCEPTION));

        if (userAccount.getStatus().equals(ACTIVE)) {
            throw new ApplicationException(USER_STATUS_ALREADY_ACTIVATED_EXCEPTION);
        }

        userAccount.setStatus(ACTIVE);
        token.setUsed(true);

        userAccountRepository.save(userAccount);
        activateAccountTokenRepository.save(token);
    }

    @Override
    public void validateToken(ActivateAccountForm form) {
        ActivateAccountToken token = activateAccountTokenRepository.getById(form.getToken())
                .orElseThrow(() -> new ApplicationException(ACTIVATE_ACCOUNT_TOKEN_NOT_FOUND_EXCEPTION));

        if (token.isUsed()) {
            throw new ApplicationException(ACTIVATE_ACCOUNT_TOKEN_ALREADY_USED_EXCEPTION);
        }

        LocalDateTime now = LocalDateTime.now();
        if (now.isAfter(token.getExpirationDate())) {
            throw new ApplicationException(ACTIVATE_ACCOUNT_TOKEN_EXPIRED_EXCEPTION);
        }
    }

    @Override
    public UserAccount getByEmail(String email) {
        return userAccountRepository.getByEmail(email)
                .orElseThrow(() -> new ApplicationException(USER_NOT_FOUND_BY_EMAIL_EXCEPTION));
    }

    @Override
    public void updateSelf(UserAccountSelfUpdateForm form, String userId) {
        UserAccount userAccount = userAccountRepository.getById(userId)
                .orElseThrow(() -> new ApplicationException(USER_NOT_FOUND_EXCEPTION));

        boolean sameEmail = form.getEmail().equals(userAccount.getEmail());
        if (!sameEmail && userAccountRepository.existsByEmail(form.getEmail())) {
            throw new ApplicationException(EMAIL_ALREADY_EXISTS_EXCEPTION);
        }

        if (form.getAttachmentId() != null) {
            Attachment attachment = attachmentService.get(form.getAttachmentId());
            userAccount.setAttachmentId(attachment.getId());
        }

        userAccount.setFirstName(form.getFirstName());
        userAccount.setLastName(form.getLastName());
        userAccount.setEmail(form.getEmail());

        userAccountRepository.save(userAccount);
    }

    @Override
    public void updateUserById(UserAccountUpdateForm userAccountUpdateForm, String userId) {
        UserAccount userAccount = userAccountRepository.getById(userId)
                .orElseThrow(() -> new ApplicationException(USER_NOT_FOUND_EXCEPTION));

        userAccount.setFirstName(userAccountUpdateForm.getFirstName());
        userAccount.setLastName(userAccountUpdateForm.getLastName());
        userAccount.setEmail(userAccountUpdateForm.getEmail());
        userAccount.setRole(UserAccountRole.valueOf(userAccountUpdateForm.getRole().toUpperCase()));
        userAccount.setStatus(UserAccountStatus.valueOf(userAccountUpdateForm.getStatus().toUpperCase()));

        if(userAccount.getAttachmentId() != null) {
            attachmentService.delete(userAccount.getAttachmentId(), userId);
        }
        userAccount.setAttachmentId(userAccountUpdateForm.getAttachmentId());

        userAccountRepository.save(userAccount);
    }

    @Override
    public void deleteById(String userId, String deletedById) {
        UserAccount userAccount = userAccountRepository.getById(userId)
                .orElseThrow(() -> new ApplicationException(USER_NOT_FOUND_EXCEPTION));

        if (userAccount.getStatus().equals(DELETED)) {
            throw new ApplicationException(USER_ALREADY_DELETED);
        }

        userAccount.setStatus(DELETED);
        userAccount.setDeletedOn(LocalDateTime.now());
        userAccount.setDeletedById(deletedById);
        userAccountRepository.save(userAccount);
        attachmentService.delete(userAccount.getAttachmentId(), userId);
        activityService.save(new RemoveUserForm(deletedById, userId));
    }

    @Override
    public boolean existsByEmail(String email) {
        return userAccountRepository.existsByEmail(email);
    }

    @Override
    public SearchResponse<UserAccount> search(SearchForm form) {
        return userAccountRepository.search(form);
    }
}