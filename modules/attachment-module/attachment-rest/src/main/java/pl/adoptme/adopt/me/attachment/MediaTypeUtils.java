package pl.adoptme.adopt.me.attachment;


import org.springframework.http.MediaType;

class MediaTypeUtils {
    public static MediaType getType(String extension) {
        switch (extension.toLowerCase()) {
            case "jpg", "jpeg" -> {
                return MediaType.IMAGE_JPEG;
            }
            case "png" -> {
                return MediaType.IMAGE_PNG;
            }
            case "gif" -> {
                return MediaType.IMAGE_GIF;
            }
            default -> {
                return MediaType.ALL;
            }
        }
    }
}

