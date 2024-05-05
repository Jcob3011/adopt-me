package pl.adoptme.adopt.me.security.jwt;


import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import pl.adoptme.adopt.me.security.SecurityService;
import pl.adoptme.adopt.me.security.config.SecurityRequestConfig;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ApplicationExceptionResponse;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;

import static jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static pl.adoptme.adoptme.common.domain.ErrorCode.JWT_TOKEN_REQUIRED_EXCEPTION;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final SecurityService securityService;
    private final SecurityRequestConfig securityRequestConfig;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            OrRequestMatcher requestMatcher = new OrRequestMatcher(
                    Arrays.stream(securityRequestConfig.getPermittedPaths())
                            .map(AntPathRequestMatcher::new)
                            .toArray(RequestMatcher[]::new)
            );

            if (requestMatcher.matches(request)) {
                filterChain.doFilter(request, response);
                return;
            }

            String authHeaderPrefix = "Bearer ";
            String authHeader = request.getHeader(AUTHORIZATION);

            if (authHeader == null || !authHeader.startsWith(authHeaderPrefix)) {
                throw new ApplicationException(JWT_TOKEN_REQUIRED_EXCEPTION);
            }

            String jwtToken = authHeader.substring(authHeaderPrefix.length());
            securityService.validateAuthToken(jwtToken);

            DecodedJWT decodedJWT = JWT.decode(jwtToken);
            securityService.validateWhiteListToken(
                    decodedJWT.getClaim("tokenId").asString(),
                    decodedJWT.getSubject()
            );

            JwtAuthUser jwtAuthUser = (JwtAuthUser) securityService.loadUserByUsername(decodedJWT.getSubject());
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    jwtAuthUser,
                    null,
                    jwtAuthUser.getAuthorities()
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);
            filterChain.doFilter(request, response);

        } catch (ApplicationException exception) {

            response.setStatus(SC_UNAUTHORIZED);
            response.setContentType(APPLICATION_JSON_VALUE);

            ApplicationExceptionResponse exceptionResponse = ApplicationExceptionResponse.builder()
                    .message(exception.getMessage())
                    .status(response.getStatus())
                    .errorCode(exception.errorCode)
                    .timestamp(LocalDateTime.now())
                    .build();

            objectMapper.writeValue(response.getOutputStream(), exceptionResponse);
        }
    }
}
