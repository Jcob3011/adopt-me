package pl.adoptme.adopt.me.login.pass.auth;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginPassAuthRepositoryJpa extends JpaRepository<LoginPassAuthEntity, String> {
}

