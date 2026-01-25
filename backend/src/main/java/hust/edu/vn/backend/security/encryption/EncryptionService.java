package hust.edu.vn.backend.security.encryption;

import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.security.dto.JwtData;

import java.util.UUID;

public interface EncryptionService {
    JwtData createTokenWithUserInfo(AppUser user);
    UUID verifyAccessToken(String accessToken);
    UUID verifyRefreshToken(String refreshToken);
}
