package pl.adoptme.adoptme.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    INEFFICIENT_LOGOUT_PRIVILEGES_EXCEPTION("User has inefficient privileges to logout another user"),
    WHITE_LIST_TOKEN_NOT_FOUND_EXCEPTION("White list token not found"),
    GMAIL_AUTHENTICATION_EXCEPTION("Gmail authentication failed"),
    GMAIL_LOGIN_PASS_AUTH_DISABLED_EXCEPTION("User doesn't have set login pass auth"),
    GMAIL_USER_NOT_AUTHENTICATED_EXCEPTION("User haven't authenticated by gmail"),
    INVALID_GMAIL_TOKEN_ID_EXCEPTION("Gmail token is not valid"),
    UNPRIVILEGED_GMAIL_DOMAIN_EXCEPTION("Unprivileged gmail domain"),
    EMAIL_NOT_FOUND_EXCEPTION("Email not found"),
    EMAIL_ALREADY_EXISTS_EXCEPTION("Email already exists"),
    USER_NOT_FOUND_EXCEPTION("User not found"),
    USER_NOT_FOUND_BY_EMAIL_EXCEPTION("User not found by email"),
    USER_ALREADY_EXISTS("User already exists"),
    USER_ALREADY_DELETED("User already deleted"),
    USER_ACCOUNT_NOT_ACTIVATED_EXCEPTION("User account is not activated"),
    USER_STATUS_ALREADY_ACTIVATED_EXCEPTION("User account is already activated"),
    ATTACHMENT_NOT_FOUND_EXCEPTION("Attachment not found"),
    ATTACHMENT_SAVING_EXCEPTION("Attachment not saved correctly"),
    ATTACHMENT_READING_EXCEPTION("Something went wrong with reading attachment"),
    VALIDATION_EXCEPTION("Validation exception"),
    FILE_NOT_FOUND_EXCEPTION("File not found exception"),
    FILE_DOWNLOAD_EXCEPTION("File download exception"),
    TAG_NOT_FOUND_EXCEPTION("Tag not found"),
    AUTHENTICATION_EXCEPTION("Invalid authentication credentials"),
    PASSWORD_RESET_TOKEN_NOT_FOUND_EXCEPTION("Token not found"),
    PASSWORD_RESET_TOKEN_ALREADY_USED_EXCEPTION("Token was already used"),
    PASSWORD_RESET_TOKEN_EXPIRED_EXCEPTION("Token already expired"),
    PASSWORD_RESET_GMAIL_AUTH_EXCEPTION("Account is authenticated by gmail"),
    ACTIVATE_ACCOUNT_TOKEN_NOT_FOUND_EXCEPTION("Token not found"),
    ACTIVATE_ACCOUNT_TOKEN_EXPIRED_EXCEPTION("Token already expired"),
    ACTIVATE_ACCOUNT_TOKEN_ALREADY_USED_EXCEPTION("Token was already used"),
    JWT_TOKEN_INVALID_USER_STATUS_EXCEPTION("User status is not active"),
    JWT_TOKEN_VERIFICATION_EXCEPTION("Authentication token is not valid"),
    JWT_TOKEN_REQUIRED_EXCEPTION("Authentication token is required"),
    LOGGED_USER_NOT_FOUND_EXCEPTION("Logged user not found"),
    JWT_TOKEN_IS_EMPTY_EXCEPTION("Authentication token is empty"),
    NOTIFICATION_NOT_FOUND_EXCEPTION("Notification not found"),
    INVALID_CURRENT_PASSWORD_EXCEPTION("Current user password is not valid"),
    SENDING_NOTIFICATION_EXCEPTION("Sending notification exception"),
    NOTIFICATION_TYPE_EXCEPTION("Unknown notification type"),
    ANIMAL_NOT_FOUND_EXCEPTION("Animal not found"),
    UNSUPPORTED_OPERATION_TYPE("Unsupported operation type"),
    WRONG_SEARCH_OPERATOR("Wrong search operator"),
    WRONG_SEARCH_CRITERIA_FIELD("Search criteria field should be one of: "),
    INVALID_SEARCH_OPERATOR("Invalid search operator"),
    PROFILE_NOT_FOUND_EXCEPTION("Profile not found"),
    PROFILE_SKILL_NOT_FOUND_EXCEPTION("ProfileSkill not found"),
    PROFILE_CERTIFICATE_NOT_FOUND_EXCEPTION("Certificate not found"),
    PROFILE_SCHOOL_NOT_FOUND_EXCEPTION("School not found"),
    PROFILE_LANGUAGE_NOT_FOUND_EXCEPTION("Language not found"),
    TASK_NOT_FOUND_EXCEPTION("Task not found"),
    TASK_HAS_ANSWER_EXCEPTION("Task already has an answer"),
    INVALID_USER_EXCEPTION("Invalid user"),
    INVALID_QUESTION_TYPE("Invalid question type"),
    JSON_PARSE_EXCEPTION("Error with json parsing"),
    RATING_UNSOLVED_TASK_EXCEPTION("Cannot rate task which is not solved"),
    INVALID_AMOUNT_OF_POINTS("Points amount must be bigger than 0 and not bigger than maxPoints"),
    ACTIVITY_NOT_FOUND_EXCEPTION("Activity not found"),
    TASK_TEMPLATE_NOT_FOUND_EXCEPTION("Task template not found"),
    INVALID_FILE_TYPE_EXCEPTION("File has invalid extension"),
    FILE_SAVE_EXCEPTION("Error while saving the file"),
    ALL_TASK_SOLVED_EXCEPTION("All tasks have been solved"),
    WRONG_QUIZ_STATUS_EXCEPTION("Quiz status has to be one of: NOT_STARTED, IN_PROGRESS"),
    INVALID_TASK_RATE_STATUS("Task status has to be WAITING_FOR_RATE to be rated"),
    TAG_ALREADY_EXISTS_EXCEPTION("Tag already exists"),
    UNPRIVILEGED_OPERATION_EXCEPTION("User doesn't have sufficient rights to perform this operation"),
    COULD_NOT_GENERATE_PDF_FILE("Could not generate pdf file"),
    USER_ALREADY_HAS_PROFILE("User already has a profile"),
    PROFILE_EXPERIENCE_NOT_FOUND_EXCEPTION("ProfileExperience not found"),
    ARTICLE_NOT_FOUND_EXCEPTION("Article not found");

    private final String description;
}
