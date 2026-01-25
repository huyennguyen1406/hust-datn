package hust.edu.vn.backend.security.service;

import hust.edu.vn.backend.security.encryption.DashboardEncryptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DashboardUserManager implements AuthenticationManager {
    private final DashboardEncryptionService dashboardEncryptionService;
    private final DashboardUserService dashboardUserService;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // Step 1: Extract JWT token from authentication credentials
        Object credentials = authentication.getCredentials();

        if (!(credentials instanceof String)) {
            throw new BadCredentialsException("Invalid token format");
        }

        String accessToken = credentials.toString();
        // Step 2: Validate JWT
        UUID uuid;
        try {
            uuid = dashboardEncryptionService.verifyAccessToken(accessToken);
        } catch (Exception e) {
            throw new BadCredentialsException("JWT token is invalid or expired");
        }
        // Step 3: Get user UUID from the token (role admin and staff only) then return UserToken
        return dashboardUserService.getUserTokenByUUID(accessToken, uuid);
    }
}
