package pl.adoptme.adopt.me.notification;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import pl.adoptme.adopt.me.notification.config.NotificationConfig;


@Configuration
class NotificationConfigImpl implements NotificationConfig {
    @Autowired
    private Environment environment;

    @Override
    public int getMaxAttempts() {
        return environment.getProperty("notification.maxAttempts", Integer.class, 5);
    }

    @Override
    public int getResendTime() {
        return environment.getProperty("notification.resendTimeInMinutes", Integer.class, 10);
    }
}
