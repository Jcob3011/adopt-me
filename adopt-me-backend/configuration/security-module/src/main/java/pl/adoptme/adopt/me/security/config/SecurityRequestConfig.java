package pl.adoptme.adopt.me.security.config;


import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityRequestConfig {

    private final Environment env;

    public String[] getPermittedPaths() {
        return env.getProperty(
                "security.permittedPathsPatterns",
                String[].class,
                new String[]{}
        );
    }

}
