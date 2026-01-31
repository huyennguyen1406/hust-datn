package hust.edu.vn.backend.service.store;

import hust.edu.vn.backend.dto.common.request.LoginRequest;
import hust.edu.vn.backend.dto.common.request.RefreshRequest;
import hust.edu.vn.backend.dto.common.request.RegisterRequest;
import hust.edu.vn.backend.dto.common.response.LoginResponse;
import hust.edu.vn.backend.dto.common.response.Message;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.entity.Role;
import hust.edu.vn.backend.entity.UserAuthentication;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.repository.AppUserRepository;
import hust.edu.vn.backend.repository.RoleRepository;
import hust.edu.vn.backend.security.constant.SecurityConstant;
import hust.edu.vn.backend.security.dto.JwtData;
import hust.edu.vn.backend.security.encryption.StoreEncryptionService;
import hust.edu.vn.backend.utility.ContextUtility;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@SuppressWarnings("DuplicatedCode")
@Service
@RequiredArgsConstructor
public class StoreLoginService {
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final StoreEncryptionService storeEncryptionService;
    @Qualifier("refreshRedisTemplate")
    private final RedisTemplate<String, String> refreshTokenRedisTemplate;

    private static final String USER = "user";


    @Transactional
    public LoginResponse register(RegisterRequest request) {
        if (appUserRepository.existsByEmail(request.getEmail())) {
            throw ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_EMAIL_EXISTED, SecurityConstant.ERROR_CODE_EMAIL_EXISTED);
        }

        if (appUserRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_PHONE_NUMBER_EXISTED, SecurityConstant.ERROR_CODE_PHONE_NUMBER_EXISTED);
        }

        Role userRole = roleRepository.findByName(USER)
                .orElseThrow(() -> ApiStatusException.internalServerError("Setup in database error: Role 'user' not found", "ERR_ROLE_NOT_FOUND"));

        AppUser appUser = new AppUser()
                .setEmail(request.getEmail())
                .setFirstName(request.getFirstName())
                .setLastName(request.getLastName())
                .setPhoneNumber(request.getPhoneNumber());

        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        appUser.setRoles(roles);

        UserAuthentication userAuthentication = new UserAuthentication();
        userAuthentication.setProvider(SecurityConstant.LOCAL);
        userAuthentication.setPassword(passwordEncoder.encode(request.getPassword()));
        userAuthentication.setUser(appUser);

        Set<UserAuthentication> userAuthentications = new HashSet<>();
        userAuthentications.add(userAuthentication);

        appUser.setAuthentications(userAuthentications);
        appUserRepository.save(appUser);

        JwtData jwtData = storeEncryptionService.createTokenWithUserInfo(appUser);
        refreshTokenRedisTemplate.opsForValue().set(appUser.getId().toString(), appUser.getId().toString(), jwtData.refreshTokenExpiry(), java.util.concurrent.TimeUnit.SECONDS);

        return new LoginResponse(jwtData.accessToken(), jwtData.refreshToken());
    }

    public LoginResponse login(LoginRequest request) {
        // Step 1: Validate if email exist
        AppUser user = appUserRepository.findByEmailAndRoles_NameIn(request.getEmail(), List.of(USER)).orElseThrow(
                () -> ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_EMAIL_PASSWORD_INVALID, SecurityConstant.ERROR_CODE_EMAIL_PASSWORD_INVALID)
        );

        // Step 2: Validate password
        UserAuthentication localAuth = user.getAuthentications().stream().filter(auth -> Objects.equals(SecurityConstant.LOCAL, auth.getProvider()))
                .findFirst().orElseThrow(() -> ApiStatusException.internalServerError(SecurityConstant.ERROR_MESSAGE_AUTHENTICATION_NOT_FOUND, SecurityConstant.ERROR_CODE_AUTHENTICATION_NOT_FOUND));

        storeEncryptionService.verifyPassword(request, localAuth);

        // Step 3: Generate JWT token
        JwtData jwtData = storeEncryptionService.createTokenWithUserInfo(user);
        refreshTokenRedisTemplate.opsForValue().set(user.getId().toString(), user.getId().toString(), jwtData.refreshTokenExpiry(), TimeUnit.SECONDS);

        return new LoginResponse(jwtData.accessToken(), jwtData.refreshToken());
    }

    public LoginResponse refreshToken(RefreshRequest request) {
        UUID uuid = storeEncryptionService.verifyRefreshToken(request.getRefreshToken());
        if (Boolean.FALSE.equals(refreshTokenRedisTemplate.hasKey(uuid.toString()))) {
            throw ApiStatusException.unauthorized("Refresh token is invalid", "REFRESH_TOKEN_INVALID");
        }

        AppUser user = appUserRepository.findById(uuid).orElseThrow(
                () -> ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_USER_NOT_FOUND, SecurityConstant.ERROR_CODE_USER_NOT_FOUND)
        );

        JwtData jwtData = storeEncryptionService.createTokenWithUserInfo(user);
        refreshTokenRedisTemplate.opsForValue().set(user.getId().toString(), user.getId().toString(), jwtData.refreshTokenExpiry(), TimeUnit.SECONDS);

        return new LoginResponse(jwtData.accessToken(), jwtData.refreshToken());
    }

    public Message logout() {
        UUID uuid = ContextUtility.getUserId();
        refreshTokenRedisTemplate.delete(uuid.toString());
        return new Message("Logout successful", "200");
    }
}
