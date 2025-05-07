package pl.adoptme.adopt.me.login.pass.auth.reset.password.token;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Getter
@Setter
@Configuration
@ConfigurationProperties
@RequiredArgsConstructor
public class PasswordResetTokenConfigImpl implements PasswordResetTokenConfig {

    private final Environment env;

    @Override
    public Integer getExpirationTime() {
        return env.getProperty(
                "loginPassAuth.reset.password.token.expirationInHours",
                Integer.class,
                24
        );
    }
}
