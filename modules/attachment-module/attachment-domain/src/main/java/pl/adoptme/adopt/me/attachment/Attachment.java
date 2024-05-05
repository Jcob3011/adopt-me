package pl.adoptme.adopt.me.attachment;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class Attachment {
    private String id;
    private String originalFileName;
    private String name;
    private String description;
    private String extension;
    private Long size;
    private String path;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime deletedOn;
    private String deletedById;
}

