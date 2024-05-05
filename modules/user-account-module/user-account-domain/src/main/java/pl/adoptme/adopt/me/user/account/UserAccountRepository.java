package pl.adoptme.adopt.me.user.account;

import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;
import java.util.Optional;

public interface UserAccountRepository {
    UserAccount save(UserAccount userAccount);

    List<UserAccount> getAll();

    Optional<UserAccount> getById(String id);

    Optional<UserAccount> getByEmail(String email);

    boolean existsByEmail(String email);

    SearchResponse<UserAccount> search(SearchForm form);
}
