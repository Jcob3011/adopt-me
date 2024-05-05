package pl.adoptme.adopt.me.attachment;


import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.adoptme.adopt.me.attachment.dto.AttachmentCreateForm;
import pl.adoptme.adopt.me.attachment.dto.BytesWithExtension;
import pl.adoptme.adoptme.adoptme.common.rest.LoggedUser;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;


import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import static pl.adoptme.adopt.me.attachment.AttachmentDtoMapper.toDto;


@RestController
@RequestMapping("attachment")
@RequiredArgsConstructor
class AttachmentController {
    private final AttachmentService attachmentService;
    private final LoggedUser loggedUser;

    @GetMapping("/{id}")
    public AttachmentDto get(@PathVariable("id") String id) {
        return toDto(attachmentService.get(id));
    }

    @GetMapping
    public List<AttachmentDto> get(@RequestParam("ids") List<String> ids) {
        return attachmentService
                .getAll(ids, false)
                .stream()
                .map(AttachmentDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/download/{id}")
    @ResponseBody
    public ResponseEntity<InputStreamResource> download(@PathVariable("id") String id) {
        BytesWithExtension bytesWithExtension = attachmentService.download(id);

        MediaType contentType = MediaTypeUtils.getType(bytesWithExtension.getExtension());

        return ResponseEntity.ok()
                .contentType(contentType)
                .body(new InputStreamResource(new ByteArrayInputStream(bytesWithExtension.getBytes())));
    }

    @PostMapping
    public AttachmentDto save(@RequestParam("name") String name, @RequestParam("description") String description,
                              @RequestParam("image") MultipartFile image) {
        try {
            return toDto(attachmentService.save(new AttachmentCreateForm(image.getOriginalFilename(),
                    name, description, image.getBytes(),
                    image.getSize(), loggedUser.getLoggedUserId(), LocalDateTime.now())));
        } catch (IOException e) {
            throw new ApplicationException(ErrorCode.ATTACHMENT_SAVING_EXCEPTION);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        attachmentService.delete(id, loggedUser.getLoggedUserId());
    }
}
