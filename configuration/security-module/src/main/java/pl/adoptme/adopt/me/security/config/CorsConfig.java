package pl.adoptme.adopt.me.security.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class CorsConfig implements WebMvcConfigurer {

    private final Environment env;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowedOrigins = env.getProperty("security.cors.allowedOrigins",
                String[].class, new String[]{});

        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}
