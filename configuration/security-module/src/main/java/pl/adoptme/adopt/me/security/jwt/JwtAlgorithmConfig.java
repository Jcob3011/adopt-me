package pl.adoptme.adopt.me.security.jwt;


import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@RequiredArgsConstructor
class JwtAlgorithmConfig {

    private final Environment env;

    @Bean
    Algorithm getAlgorithm() {
        String algorithmKey = env.getProperty(
                "security.jwt.algorithm.key",
                "secret-key"
        );
        return Algorithm.HMAC256(algorithmKey);
    }
}

