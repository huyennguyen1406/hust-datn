package hust.edu.vn.backend.security.service;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.server.PathContainer;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.util.pattern.PathPattern;
import org.springframework.web.util.pattern.PathPatternParser;

import java.util.List;

public abstract class AbstractApiMatcher implements RequestMatcher {
    protected static final PathPatternParser PARSER = new PathPatternParser();

    private List<PathPattern> patterns;

    /**
     * Subclasses only need to provide their API paths
     */
    protected abstract List<String> getApiPaths();

    @PostConstruct
    protected void init() {
        patterns = getApiPaths().stream()
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

        for (PathPattern pattern : patterns) {
            if (pattern.matches(pathContainer)) {
                return true;
            }
        }

        return false;
    }

}
