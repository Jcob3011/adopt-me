package pl.adoptme.adopt.me.notification;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
interface NotificationRepositoryJpa extends JpaRepository<NotificationEntity, String> {
    NotificationEntity findFirstBySentFalseAndAttemptsLessThanAndLastAttemptedOnLessThanEqualOrLastAttemptedOnIsNull(int attempts, LocalDateTime lastAttemptedOn);
}

