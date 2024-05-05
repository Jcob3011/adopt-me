package pl.adoptme.adopt.me.gmail.auth.infrastructure;


import pl.adoptme.adopt.me.gmail.auth.domain.GmailAuthUser;

public class GmailAuthUserEntityMapper {

    public static GmailAuthUser mapToGmailAuthUser(GmailAuthUserEntity gmailAuthUserEntity) {
        return GmailAuthUser.builder()
                .gmailId(gmailAuthUserEntity.getGmailId())
                .userId(gmailAuthUserEntity.getUserId())
                .build();
    }

    public static GmailAuthUserEntity mapToGmailAuthUserEntity(GmailAuthUser gmailAuthUser) {
        return GmailAuthUserEntity.builder()
                .gmailId(gmailAuthUser.getGmailId())
                .userId(gmailAuthUser.getUserId())
                .build();
    }
}
