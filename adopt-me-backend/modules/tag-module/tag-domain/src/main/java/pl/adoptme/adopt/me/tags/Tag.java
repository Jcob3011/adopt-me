package pl.adoptme.adopt.me.tags;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class Tag {
    private String id;
    private String name;
    private LocalDateTime createdOn;
    private String createdById;
    private LocalDateTime updatedOn;
    private LocalDateTime deletedOn;
    private String deletedById;
}
