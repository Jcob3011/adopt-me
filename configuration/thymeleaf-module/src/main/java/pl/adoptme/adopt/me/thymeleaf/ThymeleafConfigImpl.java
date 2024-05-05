package pl.adoptme.adopt.me.thymeleaf;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@RequiredArgsConstructor
public class ThymeleafConfigImpl implements ThymeleafConfig {
    private final Environment env;

    @Override
    public String getMessagesPath() {
        return env.getProperty("thymeleaf.path.messages", String.class);
    }

    @Override
    public String getTemplatesPath() {
        return env.getProperty("thymeleaf.path.templates", String.class);
    }
}
