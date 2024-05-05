package pl.adoptme.adopt.me.notification;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.adoptme.adopt.me.notification.dto.RegistrationForm;
import pl.adoptme.adopt.me.notification.dto.ResetPasswordForm;
import pl.adoptme.adopt.me.notification.dto.UpdateProfileForm;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import static pl.adoptme.adopt.me.notification.NotificationDtoMapper.toDto;


@RestController
@RequestMapping("notification")
@RequiredArgsConstructor
class NotificationController {
    private final NotificationService notificationService;

    @PostMapping("/search")
    public SearchResponse<NotificationErrorDto> search(@RequestBody SearchForm searchForm) {
        return notificationService.searchErrors(searchForm).map(NotificationErrorDto::of);
    }

    @PostMapping("/register")
    public NotificationDto send(@RequestBody RegistrationForm registrationForm) {
        return toDto(notificationService.send(registrationForm, "SYSTEM"));
    }

    @PostMapping("/update-profile")
    public NotificationDto send(@RequestBody UpdateProfileForm updateProfileForm) {
        return toDto(notificationService.send(updateProfileForm, "SYSTEM"));
    }

    @PostMapping("/reset-password")
    public NotificationDto send(@RequestBody ResetPasswordForm resetPasswordForm) {
        return toDto(notificationService.send(resetPasswordForm, "SYSTEM"));
    }
}
