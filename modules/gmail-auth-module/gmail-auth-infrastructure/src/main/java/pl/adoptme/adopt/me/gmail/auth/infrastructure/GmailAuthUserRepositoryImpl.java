package pl.adoptme.adopt.me.gmail.auth.infrastructure;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adopt.me.gmail.auth.domain.GmailAuthUser;
import pl.adoptme.adopt.me.gmail.auth.domain.GmailAuthUserRepository;

import java.util.Optional;

import static pl.adoptme.adopt.me.gmail.auth.infrastructure.GmailAuthUserEntityMapper.mapToGmailAuthUserEntity;


@Repository
@RequiredArgsConstructor
public class GmailAuthUserRepositoryImpl implements GmailAuthUserRepository {

    private final GmailAuthUserRepositoryJpa gmailAuthUserRepositoryJpa;

    @Override
    public Optional<GmailAuthUser> getById(String id) {
        return gmailAuthUserRepositoryJpa.findById(id)
                .map(GmailAuthUserEntityMapper::mapToGmailAuthUser);
    }

    @Override
    public boolean existsById(String id) {
        return gmailAuthUserRepositoryJpa.existsById(id);
    }

    @Override
    public boolean existsByUserId(String userId) {
        return gmailAuthUserRepositoryJpa.findByUserId(userId).isPresent();
    }

    @Override
    public GmailAuthUser save(GmailAuthUser gmailAuthUser) {
        gmailAuthUserRepositoryJpa.save(mapToGmailAuthUserEntity(gmailAuthUser));
        return gmailAuthUser;
    }
}

