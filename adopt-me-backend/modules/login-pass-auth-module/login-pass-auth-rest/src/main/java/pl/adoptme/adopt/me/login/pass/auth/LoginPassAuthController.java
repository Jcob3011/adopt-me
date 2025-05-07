package pl.adoptme.adopt.me.login.pass.auth;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.adoptme.adopt.me.login.pass.auth.form.*;
import pl.adoptme.adopt.me.login.pass.auth.response.LoginResponse;
import pl.adoptme.adopt.me.login.pass.auth.response.UserAuthTypeResponse;
import pl.adoptme.adoptme.adoptme.common.rest.LoggedUser;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
class LoginPassAuthController {

    private final LoginPassAuthService loginPassAuthService;
    private final LoggedUser loggedUser;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginForm form) {
        return loginPassAuthService.login(form);
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterForm form) {
        loginPassAuthService.register(form);
    }

    @PostMapping("/logout")
    public void logoutSelf() {
        loginPassAuthService.logoutSelf(loggedUser.getLoggedUserId());
    }

    @PostMapping("/logout/{userId}")
    public void logoutUserById(@PathVariable String userId) {
        loginPassAuthService.logoutUserById(userId, loggedUser.getLoggedUserId());
    }

    @PostMapping("/gmail/set-password")
    public void setPasswordToGmailAccount(@RequestBody GmailUserPasswordForm form) {
        loginPassAuthService.setPasswordToGmailAccount(form);
    }

    @PostMapping("/check-login-pass-auth")
    public UserAuthTypeResponse checkLoginPassAuth(@RequestBody UserAuthTypeForm form) {
        return loginPassAuthService.authenticatesWithLoginPass(form);
    }

    @PostMapping("/check-gmail-login-pass-auth")
    public UserAuthTypeResponse checkGmailLoginPassAuth(@RequestBody GmailUserAuthTypeForm form) {
        return loginPassAuthService.gmailUserAuthenticatesWithLoginPass(form);
    }

    @PostMapping("/change-self-password")
    public void changeSelfPassword(@RequestBody ChangeSelfPasswordForm form) {
        loginPassAuthService.changeSelfPassword(form, loggedUser.getLoggedUserId());
    }

    @PostMapping("/change-user-password")
    public void changeUserPassword(@RequestBody ChangeUserPasswordForm form) {
        loginPassAuthService.changeUserPassword(form);
    }
}
