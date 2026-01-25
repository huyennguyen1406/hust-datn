package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.security.constant.SecurityConstant;
import hust.edu.vn.backend.dto.common.request.LoginRequest;
import hust.edu.vn.backend.dto.common.response.LoginResponse;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.entity.UserAuthentication;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.AppUserRepository;
import hust.edu.vn.backend.security.dto.JwtData;
import hust.edu.vn.backend.security.encryption.DashboardEncryptionService;
import hust.edu.vn.backend.utility.ContextUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardLoginService {
    private final AppUserRepository appUserRepository;
    private final DashboardEncryptionService dashboardEncryptionService;
    

    public LoginResponse login(LoginRequest request) {
        // Step 1: Validate if email exist
        AppUser user = appUserRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_EMAIL_PASSWORD_INVALID, SecurityConstant.ERROR_CODE_EMAIL_PASSWORD_INVALID)
        );

        // Step 2: Validate password
        UserAuthentication localAuth = user.getAuthentications().stream().filter(auth -> Objects.equals(SecurityConstant.LOCAL, auth.getProvider()))
                .findFirst().orElseThrow(() -> ApiStatusException.internalServerError(SecurityConstant.ERROR_MESSAGE_AUTHENTICATION_NOT_FOUND, SecurityConstant.ERROR_CODE_AUTHENTICATION_NOT_FOUND));

        dashboardEncryptionService.verifyPassword(request, localAuth);


        // Step 3: Generate JWT token
        JwtData jwtData = dashboardEncryptionService.createTokenWithUserInfo(user);

        return new LoginResponse(jwtData.accessToken(), jwtData.refreshToken());
    }

    public Message getUserInfo() {
        UUID uuid = ContextUtility.getUserId();
        AppUser user = appUserRepository.findById(uuid).orElseThrow(
                () -> ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_USER_NOT_FOUND, SecurityConstant.ERROR_CODE_USER_NOT_FOUND)
        );
        return new Message(user.getEmail(), user.getImageLink());
    }
}
