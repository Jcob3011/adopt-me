package pl.adoptme.adoptme.common.domain.image;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.net.URL;
import java.util.Base64;

public class ImageUtils {

    public static byte[] downloadImageFromUrl(String url) throws Exception {
        URL imageUrl = new URL(url);
        BufferedInputStream inputStream = new BufferedInputStream(imageUrl.openStream());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        int value = 0;
        while((value = inputStream.read()) != -1) {
            outputStream.write(value);
        }

        outputStream.close();
        inputStream.close();
        return outputStream.toByteArray();
    }

    public static String encodeToBase64(byte[] image) {
        return Base64.getEncoder().encodeToString(image);
    }
}
