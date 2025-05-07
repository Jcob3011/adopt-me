package pl.adoptme.adopt.me.login.pass.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.PasswordResetForm;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.PasswordResetNotificationForm;
import pl.adoptme.adopt.me.login.pass.auth.reset.password.token.form.TokenValidationForm;


@RestController
@RequestMapping("/password-reset")
@RequiredArgsConstructor
public class PasswordResetController {

    private final LoginPassAuthService loginPassAuthService;

    @PostMapping
    public void resetPassword(@RequestBody PasswordResetForm form) {
        loginPassAuthService.resetPassword(form);
    }

    @PostMapping("/send-notification")
    public void sendNotificationToResetPassword(@RequestBody PasswordResetNotificationForm form) {
        loginPassAuthService.sendNotificationToResetPassword(form);
    }

    @PostMapping("/validate-token")
    public void validateToken(@RequestBody TokenValidationForm form) {
        loginPassAuthService.validateToken(form);
    }
}
