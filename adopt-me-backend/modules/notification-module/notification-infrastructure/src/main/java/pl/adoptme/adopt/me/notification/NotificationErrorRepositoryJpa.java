package pl.adoptme.adopt.me.notification;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

interface NotificationErrorRepositoryJpa extends JpaRepository<NotificationErrorEntity, String>, JpaSpecificationExecutor<NotificationErrorEntity> {
}
