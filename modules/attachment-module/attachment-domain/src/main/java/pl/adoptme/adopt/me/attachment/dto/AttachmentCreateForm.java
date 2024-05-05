package pl.adoptme.adopt.me.attachment.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@Setter
@Getter
public class AttachmentCreateForm {
    @NotBlank(message = "Field originalFileName is mandatory.")
    private String originalFileName;
    @NotBlank(message = "Field name is mandatory.")
    private String name;
    @NotBlank(message = "Field description is mandatory.")
    private String description;
    @NotNull
    private byte[] image;
    @NotNull
    private Long size;
    @NotBlank(message = "Field createdById is mandatory.")
    private String createdById;
    @NotNull
    private LocalDateTime createdOn;

    @Override
    public String toString() {
        return "AttachmentCreateForm{" +
                "originalFileName='" + originalFileName + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", size=" + size +
                ", createdById='" + createdById + '\'' +
                ", createdOn=" + createdOn +
                '}';
    }
}
