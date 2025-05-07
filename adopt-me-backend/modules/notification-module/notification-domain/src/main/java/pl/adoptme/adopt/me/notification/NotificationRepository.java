package pl.adoptme.adopt.me.notification;


import pl.adoptme.adopt.me.notification.model.Notification;

interface NotificationRepository {
    Notification getNotSent();

    Notification save(Notification notification);
}
