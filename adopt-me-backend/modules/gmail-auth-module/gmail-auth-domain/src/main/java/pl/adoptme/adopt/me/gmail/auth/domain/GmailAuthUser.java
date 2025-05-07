package pl.adoptme.adopt.me.gmail.auth.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GmailAuthUser {
    private String gmailId;
    private String userId;
}

