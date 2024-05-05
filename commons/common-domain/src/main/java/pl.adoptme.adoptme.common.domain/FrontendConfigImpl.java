package pl.adoptme.adoptme.common.domain;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FrontendConfigImpl implements FrontendConfig {

    private final Environment env;

    @Override
    public String getPasswordResetUrl() {
        return env.getProperty("frontend.url.passwordReset");
    }

    @Override
    public String getActivateAccountUrl() {
        return env.getProperty("frontend.url.activateAccount");
    }
    @Override
    public String getQuizInviteUrl() {
        return env.getProperty("frontend.url.quizInvite");
    }
}