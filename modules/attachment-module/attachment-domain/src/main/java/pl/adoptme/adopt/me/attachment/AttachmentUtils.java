package pl.adoptme.adopt.me.attachment;


import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;

import java.util.List;

public class AttachmentUtils {
    public static String getExtension(String fileName) {
        if ((fileName.indexOf('.') == -1)) {
            throw new ApplicationException(ErrorCode.INVALID_FILE_TYPE_EXCEPTION);
        }
        String extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        List<String> extensions = List.of("jpg", "png", "gif", "jpeg");
        if (!extensions.contains(extension.toLowerCase())) {
            throw new ApplicationException(ErrorCode.INVALID_FILE_TYPE_EXCEPTION);
        }
        return extension;
    }
}
