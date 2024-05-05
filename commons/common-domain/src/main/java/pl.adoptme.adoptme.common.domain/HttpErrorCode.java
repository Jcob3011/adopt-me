package pl.adoptme.adoptme.common.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum HttpErrorCode {
    SERVER_ERROR(500),
    VALIDATION_EXCEPTION(400);

    private final Integer value;
}
