package hust.edu.vn.backend.security.service;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PublicApiMatcher extends AbstractApiMatcher {
    private static final List<String> API_PATHS = List.of(
            "/api/v1/dashboard/master-data/create-admin",
            "/api/v1/dashboard/login", "/api/v1/dashboard/refresh-token",
            "/api/v1/store/register", "/api/v1/store/login", "/api/v1/store/refresh-token"
    );

    @Override
    protected List<String> getApiPaths() {
        return API_PATHS;
    }
}
