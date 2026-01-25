package hust.edu.vn.backend.security.dto;

public record JwtData(String accessToken, String refreshToken, int accessTokenExpiry, int refreshTokenExpiry) {
}
