package pl.adoptme.adopt.me.user.account;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.adoptme.adopt.me.user.account.activate.account.token.form.ActivateAccountForm;
import pl.adoptme.adopt.me.user.account.activate.account.token.form.ActivateAccountNotificationForm;


@RestController
@RequestMapping("/activate-account")
@RequiredArgsConstructor
public class ActivateAccountController {

    private final UserAccountService userAccountService;

    @PostMapping("/send-notification")
    public void sendNotificationToActivateAccount(@RequestBody ActivateAccountNotificationForm form) {
        userAccountService.sendNotificationToActiveAccount(form);
    }

    @PostMapping
    public void activateAccount(@RequestBody ActivateAccountForm form) {
        userAccountService.activateAccount(form);
    }

    @PostMapping("/validate-token")
    public void validateActivateAccountToken(@RequestBody ActivateAccountForm form) {
        userAccountService.validateToken(form);
    }
}
