package pl.adoptme.adopt.me.activities;


import lombok.Getter;

@Getter
public enum ActivityType {

    LOGIN_SUCCESS("login succeeded"),
    LOGIN_FAILED("login failed"),
    ADDED_ATTACHMENT("attachment added"),
    REMOVED_ATTACHMENT("attachment removed"),
    ADDED_ANIMAL("animal added"),
    UPDATE_ANIMAL("animal is updated"),
    UPDATE_ARTICLE("article is updated"),
    REMOVED_ANIMAL("animal removed"),
    ADDED_ARTICLE("article added"),
    REMOVED_ARTICLE("article removed"),
    ADDED_TAG("tag added"),
    REMOVED_TAG("tag removed"),
    ADDED_USER("Creating new user"),
    REMOVED_USER("Removing user"),
    ANSWERED_QUESTION("User answered the question"),
    QUIZ_FINISH("User finish quiz"),
    SENT_NOTIFICATION("notification sent");

    private final String description;

    ActivityType(String description) {
        this.description = description;
    }
}
