import {ApiException} from "../../api/commons/api-exception/ApiException";

export class SnackbarMessageMapper {

    static mapFromErrorCode = (errorCode: string) => {
        switch (errorCode) {
            case ApiException.AUTHENTICATION_EXCEPTION:
                return "snackbar.error.authenticationException"
            case ApiException.USER_ACCOUNT_NOT_ACTIVATED_EXCEPTION:
                return "snackbar.error.userAccountNotActivatedException"
            case ApiException.USER_ALREADY_EXISTS:
                return "snackbar.error.userAlreadyExists"
            case ApiException.GMAIL_AUTHENTICATION_EXCEPTION:
                return "snackbar.error.gmailAuthenticationException"
            case ApiException.UNPRIVILEGED_GMAIL_DOMAIN_EXCEPTION:
                return "snackbar.error.unprivilegedGmailDomainException"
            case ApiException.ACTIVATE_ACCOUNT_TOKEN_ALREADY_USED_EXCEPTION:
                return "snackbar.error.activateAccountTokenAlreadyUsedException"
            case ApiException.PASSWORD_RESET_TOKEN_EXPIRED_EXCEPTION:
                return "snackbar.error.passwordResetTokenExpiredException"
            case ApiException.PASSWORD_RESET_TOKEN_ALREADY_USED_EXCEPTION:
                return "snackbar.error.passwordResetTokenAlreadyUsedException"
            case ApiException.PASSWORD_RESET_GMAIL_AUTH_EXCEPTION:
                return "snackbar.error.passwordResetGmailAuthException"
            case ApiException.GMAIL_LOGIN_PASS_AUTH_DISABLED_EXCEPTION:
                return "snackbar.error.gmailLoginPassAuthDisabledException"
            case ApiException.USER_NOT_FOUND_BY_EMAIL_EXCEPTION:
                return "snackbar.error.userNotFoundByEmailException"
            case ApiException.TAG_ALREADY_EXISTS_EXCEPTION:
                return "snackbar.error.tagAlreadyExistsException"
        }
        return "snackbar.error.defaultMessage"
    }
}