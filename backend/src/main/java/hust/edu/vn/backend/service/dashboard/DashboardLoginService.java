package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.dto.common.request.RefreshRequest;
import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.dto.common.response.UserInformation;
import hust.edu.vn.backend.entity.Role;
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
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class DashboardLoginService {
    private final AppUserRepository appUserRepository;
    private final DashboardEncryptionService dashboardEncryptionService;
    @Qualifier("refreshRedisTemplate")
    private final RedisTemplate<String, String> refreshTokenRedisTemplate;

    public LoginResponse login(LoginRequest request) {
        // Step 1: Validate if email exist
        AppUser user = appUserRepository.findByEmailAndRoles_NameIn(request.getEmail(), List.of("admin", "staff")).orElseThrow(
                () -> ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_EMAIL_PASSWORD_INVALID, SecurityConstant.ERROR_CODE_EMAIL_PASSWORD_INVALID)
        );

        // Step 2: Validate password
        UserAuthentication localAuth = user.getAuthentications().stream().filter(auth -> Objects.equals(SecurityConstant.LOCAL, auth.getProvider()))
                .findFirst().orElseThrow(() -> ApiStatusException.internalServerError(SecurityConstant.ERROR_MESSAGE_AUTHENTICATION_NOT_FOUND, SecurityConstant.ERROR_CODE_AUTHENTICATION_NOT_FOUND));

        dashboardEncryptionService.verifyPassword(request, localAuth);

        // Step 3: Generate JWT token
        JwtData jwtData = dashboardEncryptionService.createTokenWithUserInfo(user);
        refreshTokenRedisTemplate.opsForValue().set(user.getId().toString(), user.getId().toString(), jwtData.refreshTokenExpiry(), TimeUnit.SECONDS);

        return new LoginResponse(jwtData.accessToken(), jwtData.refreshToken());
    }

    public UserInformation getUserInfo() {
        UUID uuid = ContextUtility.getUserId();
        AppUser user = appUserRepository.findByIdWithRole(uuid).orElseThrow(
                () -> ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_USER_NOT_FOUND, SecurityConstant.ERROR_CODE_USER_NOT_FOUND)
        );
        UserInformation userInformation = new UserInformation();
        BeanUtils.copyProperties(user, userInformation);
        userInformation.setRoles(user.getRoles().stream().map(Role::getName).toList());
        return userInformation;
    }

    public LoginResponse refreshToken(RefreshRequest request) {
        UUID uuid = dashboardEncryptionService.verifyRefreshToken(request.getRefreshToken());
        if (Boolean.FALSE.equals(refreshTokenRedisTemplate.hasKey(uuid.toString()))) {
            throw ApiStatusException.unauthorized("Refresh token is invalid", "REFRESH_TOKEN_INVALID");
        }

        AppUser user = appUserRepository.findById(uuid).orElseThrow(
                () -> ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_USER_NOT_FOUND, SecurityConstant.ERROR_CODE_USER_NOT_FOUND)
        );

        JwtData jwtData = dashboardEncryptionService.createTokenWithUserInfo(user);
        refreshTokenRedisTemplate.opsForValue().set(user.getId().toString(), user.getId().toString(), jwtData.refreshTokenExpiry(), TimeUnit.SECONDS);

        return new LoginResponse(jwtData.accessToken(), jwtData.refreshToken());
    }

    public Message logout() {
        UUID uuid = ContextUtility.getUserId();
        refreshTokenRedisTemplate.delete(uuid.toString());
        return new Message("Logout successful", "200");
    }
}
