package pl.adoptme.adopt.me.attachment.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class BytesWithExtension {
    private byte[] bytes;
    private String extension;
}
