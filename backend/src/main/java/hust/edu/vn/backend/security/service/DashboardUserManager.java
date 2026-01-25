package hust.edu.vn.backend.security.service;

import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.security.encryption.DashboardEncryptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.UUID;

import static hust.edu.vn.backend.security.constant.SecurityConstant.ERROR_CODE_JWT_EXPIRED;

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
        } catch (ApiStatusException e) {
            throw new BadCredentialsException(
                    ERROR_CODE_JWT_EXPIRED.equals(e.getSystemCode())
                            ? "JWT token is expired"
                            : "JWT token is invalid"
            );
        } catch (Exception e) {
            throw new BadCredentialsException("JWT token is invalid");
        }
        // Step 3: Get user UUID from the token (role admin and staff only) then return UserToken
        return dashboardUserService.getUserTokenByUUID(accessToken, uuid);
    }
}
