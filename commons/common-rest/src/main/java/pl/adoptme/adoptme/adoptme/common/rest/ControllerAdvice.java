package pl.adoptme.adoptme.adoptme.common.rest;


import jakarta.validation.ConstraintViolationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ApplicationExceptionResponse;
import pl.adoptme.adoptme.common.domain.ErrorCode;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static pl.adoptme.adoptme.common.domain.HttpErrorCode.VALIDATION_EXCEPTION;
import static pl.adoptme.adoptme.common.domain.HttpErrorCode.SERVER_ERROR;

@RestControllerAdvice
public class ControllerAdvice {

    @ResponseStatus(code = INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ApplicationException.class)
    public ApplicationExceptionResponse handleApplicationException(ApplicationException exception) {
        Map<String, String> messages = new HashMap<>();
        messages.put("form", exception.getMessage());

        return ApplicationExceptionResponse.builder()
                .errors(messages)
                .message(exception.getMessage())
                .status(SERVER_ERROR.getValue())
                .errorCode(exception.errorCode)
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ResponseStatus(code = INTERNAL_SERVER_ERROR)
    @ExceptionHandler(ConstraintViolationException.class)
    public ApplicationExceptionResponse handleConstraintViolationException(ConstraintViolationException exception) {
        Map<String, String> messages = new HashMap<>();
        exception.getConstraintViolations().forEach(constraintViolation -> {
            String[] exceptionNodes = constraintViolation.getPropertyPath().toString().split("[.]");
            String shortExceptionPath = exceptionNodes.length > 1 ?
                    exceptionNodes[exceptionNodes.length - 1] :
                    exceptionNodes[0];
            messages.put(shortExceptionPath, constraintViolation.getMessage());
        });

        return ApplicationExceptionResponse.builder()
                .errors(messages)
                .message(ErrorCode.VALIDATION_EXCEPTION.getDescription())
                .status(VALIDATION_EXCEPTION.getValue())
                .errorCode(ErrorCode.VALIDATION_EXCEPTION)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
