package pl.adoptme.adopt.me.notification;


import pl.adoptme.adopt.me.notification.model.Notification;

class NotificationDtoMapper {
    public static NotificationDto toDto(Notification notification) {
        return NotificationDto.builder()
                .id(notification.getId())
                .email(notification.getEmail())
                .firstName(notification.getFirstName())
                .lastName(notification.getLastName())
                .type(notification.getType())
                .sent(notification.isSent())
                .createdOn(notification.getCreatedOn())
                .createdById(notification.getCreatedById())
                .build();
    }
}

