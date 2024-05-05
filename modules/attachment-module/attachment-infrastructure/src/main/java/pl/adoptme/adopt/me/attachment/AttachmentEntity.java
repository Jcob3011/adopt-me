package pl.adoptme.adopt.me.attachment;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "attachment")
class AttachmentEntity {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "original_file_name")
    private String originalFileName;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "extension")
    private String extension;
    @Column(name = "size")
    private Long size;
    @Column(name = "path")
    private String path;
    @Column(name = "created_on")
    private LocalDateTime createdOn;
    @Column(name = "created_by_id")
    private String createdById;
    @Column(name = "deleted_on")
    private LocalDateTime deletedOn;
    @Column(name = "deleted_by_id")
    private String deletedById;
}

