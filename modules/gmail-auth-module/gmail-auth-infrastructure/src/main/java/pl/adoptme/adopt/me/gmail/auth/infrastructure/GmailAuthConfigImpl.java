package pl.adoptme.adopt.me.gmail.auth.infrastructure;


import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import pl.adoptme.adopt.me.gmail.auth.domain.GmailAuthConfig;


import java.util.Set;

@Setter
@Component
@RequiredArgsConstructor
public class GmailAuthConfigImpl implements GmailAuthConfig {

    private final Environment env;

    @Override
    public String getClientId() {
        return env.getProperty("gmailAuth.clientId");
    }

    @Override
    public String getClientSecret() {
        return env.getProperty("gmailAuth.clientSecret");
    }

    @Override
    public String getRedirectUrl() {
        return env.getProperty("gmailAuth.redirectUrl");
    }

    @Override
    public String getAuthUrl() {
        return env.getProperty("gmailAuth.authUrl");
    }

    @Override
    public Set<String> getPrivilegedDomains() {
        String[] privilegedDomains = env.getProperty(
                "gmailAuth.privilegedDomains",
                String[].class,
                new String[]{}
        );
        return Set.of(privilegedDomains);
    }

    @Override
    public Set<String> getScopes() {
        String[] scopes = env.getProperty(
                "gmailAuth.scopes",
                String[].class,
                new String[]{}
        );
        return Set.of(scopes);
    }
}
