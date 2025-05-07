package pl.adoptme.adopt.me.user.account;

import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import pl.adoptme.adopt.me.user.account.activate.account.token.form.ActivateAccountForm;
import pl.adoptme.adopt.me.user.account.activate.account.token.form.ActivateAccountNotificationForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountSaveForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountSelfUpdateForm;
import pl.adoptme.adopt.me.user.account.form.UserAccountUpdateForm;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;

@Validated
public interface UserAccountService {

    UserAccount get(String id);

    UserAccount getOrNull(String id, boolean withDeleted);

    List<UserAccount> getAll(List<String> ids, boolean withDeleted);

    List<UserAccount> getAll();

    UserAccount save(@Valid UserAccountSaveForm userAccountSaveForm, String createdById);

    void sendNotificationToActiveAccount(@Valid ActivateAccountNotificationForm form);

    void activateAccount(@Valid ActivateAccountForm form);

    void validateToken(@Valid ActivateAccountForm form);

    UserAccount getByEmail(String email);

    void updateSelf(@Valid UserAccountSelfUpdateForm form, String userId);

    void updateUserById(@Valid UserAccountUpdateForm userAccountUpdateForm, String userId);

    void deleteById(String userId, String deletedById);

    boolean existsByEmail(String email);

    SearchResponse<UserAccount> search(@Valid SearchForm form);
}
