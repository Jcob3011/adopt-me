package pl.adoptme.adopt.me.attachment;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@RequiredArgsConstructor
class AttachmentConfigImpl implements AttachmentConfig {
    private final Environment env;

    @Override
    public String getSavePath() {
        return env.getProperty("attachment.savePath.data", String.class, "Storage-data");
    }
}
