package hust.edu.vn.backend.security.service;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PublicApiMatcher extends AbstractApiMatcher {
    private static final List<String> API_PATHS = List.of(
            "/api/v1/dashboard/login"
    );

    @Override
    protected List<String> getApiPaths() {
        return API_PATHS;
    }
}
