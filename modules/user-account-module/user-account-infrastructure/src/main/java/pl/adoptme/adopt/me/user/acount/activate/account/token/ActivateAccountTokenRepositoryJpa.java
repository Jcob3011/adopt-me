package pl.adoptme.adopt.me.user.acount.activate.account.token;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivateAccountTokenRepositoryJpa extends JpaRepository<ActivateAccountTokenEntity, String> {
}
