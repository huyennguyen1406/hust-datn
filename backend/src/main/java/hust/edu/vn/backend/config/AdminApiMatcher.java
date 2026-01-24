package hust.edu.vn.backend.config;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.server.PathContainer;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.util.pattern.PathPattern;
import org.springframework.web.util.pattern.PathPatternParser;

import java.util.List;

@Component
public class AdminApiMatcher implements RequestMatcher {
    private static final PathPatternParser PARSER = new PathPatternParser();

    private static final List<String> ADMIN_API_PATHS = List.of("/api/v1/admin/master-data");

    private List<PathPattern> adminPattern;

    @PostConstruct
    protected void init() {
        adminPattern = ADMIN_API_PATHS.stream()
                .map(PARSER::parse)
                .toList();
    }


    @Override
    public boolean matches(HttpServletRequest request) {
        String requestPath = request.getRequestURI();
        String contextPath = request.getContextPath();
        if (contextPath != null && !contextPath.isEmpty() && requestPath.startsWith(contextPath)) {
            requestPath = requestPath.substring(contextPath.length());
            if (requestPath.isEmpty()) {
                requestPath = "/";
            }
        }

        PathContainer pathContainer = PathContainer.parsePath(requestPath);

        for (PathPattern pattern : adminPattern) {
            if (pattern.matches(pathContainer)) {
                return true;
            }
        }

        return false;
    }

}
