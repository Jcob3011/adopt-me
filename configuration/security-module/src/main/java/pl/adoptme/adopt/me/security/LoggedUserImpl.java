package pl.adoptme.adopt.me.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.adoptme.adopt.me.security.jwt.JwtAuthUser;
import pl.adoptme.adoptme.adoptme.common.rest.LoggedUser;
import pl.adoptme.adoptme.common.domain.ApplicationException;

import static pl.adoptme.adoptme.common.domain.ErrorCode.LOGGED_USER_NOT_FOUND_EXCEPTION;


@Component
public class LoggedUserImpl implements LoggedUser {

    @Override
    public String getLoggedUserId() {
        try {
            return ((JwtAuthUser) SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getPrincipal())
                    .getId();
        } catch (Exception exception) {
            throw new ApplicationException(LOGGED_USER_NOT_FOUND_EXCEPTION);
        }
    }
}
