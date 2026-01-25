package hust.edu.vn.backend.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class LoginEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper mapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);

        problem.setTitle(safeTitle(authException));
        problem.setDetail(authException.getMessage());

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json;charset=UTF-8");

        mapper.writeValue(response.getOutputStream(), problem);
    }

    private String safeTitle(AuthenticationException ex) {
        if (ex instanceof BadCredentialsException) return "Bad credentials";
        if (ex instanceof UsernameNotFoundException) return "Username not found";
        return "Authentication failed";
    }

}
