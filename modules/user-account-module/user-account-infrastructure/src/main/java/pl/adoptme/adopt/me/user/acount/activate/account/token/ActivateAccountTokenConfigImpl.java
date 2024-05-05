package pl.adoptme.adopt.me.user.acount.activate.account.token;


import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import pl.adoptme.adopt.me.user.account.activate.account.token.ActivateAccountTokenConfig;


@Component
@RequiredArgsConstructor
public class ActivateAccountTokenConfigImpl implements ActivateAccountTokenConfig {

    private final Environment env;

    @Override
    public Integer getExpirationTime() {
        return env.getProperty(
                "userAccount.activate.account.token.expirationInHours",
                Integer.class,
                1
        );
    }
}

