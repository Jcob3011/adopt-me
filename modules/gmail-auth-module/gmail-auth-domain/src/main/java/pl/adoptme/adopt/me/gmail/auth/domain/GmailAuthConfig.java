package pl.adoptme.adopt.me.gmail.auth.domain;


import java.util.Set;

public interface GmailAuthConfig {

    String getClientId();

    String getClientSecret();

    String getRedirectUrl();

    String getAuthUrl();

    Set<String> getPrivilegedDomains();

    Set<String> getScopes();
}

