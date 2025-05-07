package pl.adoptme.adopt.me.user.acount;



import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adopt.me.user.account.UserAccount;
import pl.adoptme.adopt.me.user.account.UserAccountRepository;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.user.acount.UserAccountEntityMapper.mapToUserAccountEntity;
import static pl.adoptme.adoptme.adoptme.common.infrastructure.SearchUtils.createSearchResponse;


@Repository
@RequiredArgsConstructor
class UserAccountRepositoryImpl implements UserAccountRepository {

    private final UserAccountRepositoryJpa userAccountRepositoryJpa;
    private final List<String> filterList = List.of(
            "id",
            "firstName",
            "lastName",
            "email",
            "status",
            "role",
            "createdOn",
            "createdById",
            "updatedOn",
            "deletedOn",
            "deletedById",
            "attachmentId"
    );

    @Override
    public UserAccount save(UserAccount userAccount) {
        userAccountRepositoryJpa.save(
                mapToUserAccountEntity(userAccount)
        );
        return userAccount;
    }

    @Override
    public List<UserAccount> getAll() {
        return userAccountRepositoryJpa.findAll().stream()
                .map(UserAccountEntityMapper::mapToUserAccount)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserAccount> getById(String id) {
        return userAccountRepositoryJpa.findById(id)
                .map(UserAccountEntityMapper::mapToUserAccount);
    }

    @Override
    public Optional<UserAccount> getByEmail(String email) {
        return userAccountRepositoryJpa.findByEmail(email)
                .map(UserAccountEntityMapper::mapToUserAccount);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userAccountRepositoryJpa.findByEmail(email).isPresent();
    }

    @Override
    public SearchResponse<UserAccount> search(SearchForm form) {
        return createSearchResponse(
                userAccountRepositoryJpa, form, filterList,
                UserAccountEntityMapper::mapToUserAccount);
    }
}
