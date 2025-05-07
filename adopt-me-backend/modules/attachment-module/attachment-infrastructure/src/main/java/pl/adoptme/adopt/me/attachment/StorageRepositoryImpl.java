package pl.adoptme.adopt.me.attachment;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;

@Repository
@RequiredArgsConstructor
class StorageRepositoryImpl implements StorageRepository {
    private final AttachmentConfig attachmentConfig;

    @Override
    public String save(byte[] file, String id) {
        String PATH = attachmentConfig.getSavePath();

        LocalDateTime dateTime = LocalDateTime.now();
        String endPath = PATH + "\\" + dateTime.getYear() + "\\" + dateTime.getMonth().getValue() + "\\" + dateTime.getDayOfMonth();
        try {
            File pathFile = new File(endPath);
            if (!pathFile.canWrite()) {
                pathFile.mkdirs();
            }
            String endPathWithId = endPath + "\\" + id;
            Files.write(Path.of(endPathWithId), file);
            return endPathWithId;
        } catch (IOException e) {
            throw new ApplicationException(ErrorCode.FILE_SAVE_EXCEPTION);
        }
    }

    @Override
    public byte[] get(String path) {
        if (path == null) {
            throw new ApplicationException(ErrorCode.FILE_NOT_FOUND_EXCEPTION);
        }
        File file = new File(path);
        try (InputStream inputStream = new FileInputStream(file)) {
            return inputStream.readAllBytes();
        } catch (IOException e) {
            throw new ApplicationException(ErrorCode.FILE_DOWNLOAD_EXCEPTION);
        }
    }

    @Override
    public void delete(String path) {
        File file = new File(path);
        file.delete();
    }
}

