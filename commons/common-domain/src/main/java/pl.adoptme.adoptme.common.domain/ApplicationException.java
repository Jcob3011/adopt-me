package pl.adoptme.adoptme.common.domain;

public class ApplicationException extends RuntimeException {

    public final ErrorCode errorCode;

    public ApplicationException(ErrorCode errorCode) {
        super(errorCode.getDescription());
        this.errorCode = errorCode;
    }

    public ApplicationException(ErrorCode errorCode, String description) {
        super(description);
        this.errorCode = errorCode;
    }
}