package pl.adoptme.adopt.me.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@ComponentScan(basePackages = "pl.adoptme.*")
@EntityScan(basePackages = "pl.adoptme.*")
@EnableJpaRepositories(basePackages = "pl.adoptme.*")
@EnableScheduling
public class AdoptMeApplication {


    public static void main(String[] args) {
        SpringApplication.run(AdoptMeApplication.class, args);
    }


}
