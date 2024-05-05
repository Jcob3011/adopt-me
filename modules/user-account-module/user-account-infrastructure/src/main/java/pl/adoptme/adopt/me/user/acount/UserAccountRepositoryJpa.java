package pl.adoptme.adopt.me.user.acount;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adopt.me.user.account.UserAccountRole;


import java.util.List;
import java.util.Optional;

@Repository
interface UserAccountRepositoryJpa extends JpaRepository<UserAccountEntity, String>,
        JpaSpecificationExecutor<UserAccountEntity> {

    List<UserAccountEntity> findByRole(UserAccountRole userAccountRole);

    Optional<UserAccountEntity> findByEmail(String email);
}
