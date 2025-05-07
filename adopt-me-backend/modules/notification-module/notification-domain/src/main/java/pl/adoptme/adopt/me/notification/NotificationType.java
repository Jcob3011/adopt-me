package pl.adoptme.adopt.me.notification;


public enum NotificationType {
    REGISTRATION(Names.REGISTRATION),

    PASSWORD_RESET(Names.PASSWORD_RESET),
    UPDATE_PROFILE(Names.UPDATE_PROFILE);

    public final String name;

    NotificationType(String name) {
        this.name = name;
    }

    public static class Names {
        public static final String REGISTRATION = "REGISTRATION";
        public static final String PASSWORD_RESET = "PASSWORD_RESET";
        public static final String UPDATE_PROFILE = "UPDATE_PROFILE";
    }
}
