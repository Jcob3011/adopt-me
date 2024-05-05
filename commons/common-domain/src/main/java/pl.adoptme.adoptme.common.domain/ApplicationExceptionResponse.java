package pl.adoptme.adoptme.common.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Builder
@Getter
@Setter
public class ApplicationExceptionResponse {
    private Map<String, String> errors;
    private Integer status;
    private ErrorCode errorCode;
    private LocalDateTime timestamp;
    private String message;
}
