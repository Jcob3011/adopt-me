package pl.adoptme.adopt.me.security.white.list;


import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthTokenWhiteListConfigImpl implements AuthTokenWhiteListConfig {

    private final Environment env;

    @Override
    public boolean isEnabled() {
        return env.getProperty(
                "security.whitelist.enabled",
                Boolean.class,
                false
        );
    }
}
