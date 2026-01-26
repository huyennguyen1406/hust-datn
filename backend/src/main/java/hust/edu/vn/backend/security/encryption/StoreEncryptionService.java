package hust.edu.vn.backend.security.encryption;

import hust.edu.vn.backend.dto.common.request.LoginRequest;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.entity.Role;
import hust.edu.vn.backend.entity.UserAuthentication;
import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.security.config.StoreSecurityProperties;
import hust.edu.vn.backend.security.constant.SecurityConstant;
import hust.edu.vn.backend.security.dto.JwtData;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

import static hust.edu.vn.backend.security.constant.SecurityConstant.ERROR_CODE_JWT_EXPIRED;


@SuppressWarnings("DuplicatedCode")
@Service
@RequiredArgsConstructor
@Slf4j
public class StoreEncryptionService implements EncryptionService {
    private static final String REFRESH_TOKEN = "refresh_token";
    private static final String ACCESS_TOKEN = "access_token";
    private static final String TYPE = "type";
    private final PasswordEncoder passwordEncoder;
    private final StoreSecurityProperties storeSecurityProperties;

    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        String secret = storeSecurityProperties.getSecret();
        if (secret == null || secret.isBlank()) {
            throw new IllegalStateException("JWT secret not configured");
        }

        try {
            byte[] keyBytes = Decoders.BASE64.decode(secret);
            if (keyBytes.length < 64) {
                throw new IllegalStateException("Decoded key too short for HS512: " + (keyBytes.length * 8) + " bits. Provide a 512-bit (64 byte) key encoded in Base64.");
            }
            secretKey = Keys.hmacShaKeyFor(keyBytes);
        } catch (IllegalArgumentException ex) {
            throw new IllegalStateException("JWT secret must be a Base64-encoded 64-byte (512-bit) key for HS512", ex);
        }
    }

    @Override
    public JwtData createTokenWithUserInfo(AppUser user) {
        return new JwtData(generateAccessToken(user), generateRefreshToken(user), storeSecurityProperties.getAccessTokenExpiration(), storeSecurityProperties.getRefreshTokenExpiration());
    }


    private String generateRefreshToken(AppUser user){
        Instant now = Instant.now();
        Instant expireTime = now.plus(storeSecurityProperties.getRefreshTokenExpiration(), ChronoUnit.SECONDS);

        return Jwts.builder()
                .subject(user.getId().toString())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expireTime))
                .issuer(storeSecurityProperties.getIssuer())
                .audience().add(storeSecurityProperties.getAudience()).and()
                .claim(TYPE, REFRESH_TOKEN)
                .signWith(secretKey)
                .compact();
    }

    private String generateAccessToken(AppUser user){
        Instant now = Instant.now();
        Instant expireTime = now.plus(storeSecurityProperties.getAccessTokenExpiration(), ChronoUnit.SECONDS);

        return Jwts.builder()
                // standard claims
                .subject(user.getId().toString())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expireTime))
                .issuer(storeSecurityProperties.getIssuer())
                .audience().add(storeSecurityProperties.getAudience()).and()
                .claim("email", user.getEmail())
                .claim("role", user.getRoles().stream().map(Role::getName).toList())
                .claim("firstName", user.getFirstName())
                .claim("lastName", user.getLastName())
                .claim(TYPE, ACCESS_TOKEN)
                .signWith(secretKey)
                .compact();
    }

    @Override
    public UUID verifyAccessToken(String accessToken) {
        return getUuid(accessToken, ACCESS_TOKEN);
    }

    @Override
    public UUID verifyRefreshToken(String refreshToken) {
        return getUuid(refreshToken, REFRESH_TOKEN);
    }

    private UUID getUuid(String jwtToken, String tokenType) {
        JwtParser parser = Jwts.parser()
                .verifyWith(secretKey)
                .build();
        Jws<Claims> jws;
        try {
            jws = parser.parseSignedClaims(jwtToken);
        } catch (ExpiredJwtException expiredException) {
            throw ApiStatusException.unauthorized(SecurityConstant.ERROR_MESSAGE_BAD_CREDENTIAL, ERROR_CODE_JWT_EXPIRED);
        } catch (Exception ex) {
            log.warn(ex.getMessage());
            throw ApiStatusException.unauthorized(SecurityConstant.ERROR_MESSAGE_BAD_CREDENTIAL, "ERR_INVALID_JWT");
        }

        String alg = jws.getHeader().getAlgorithm();
        if (!Objects.equals(alg, "HS512")) {
            throw ApiStatusException.unauthorized(SecurityConstant.ERROR_MESSAGE_BAD_CREDENTIAL, "ERR_INVALID_JWT_ALGORITHM");
        }

        Claims claims = jws.getPayload();

        String type = claims.get(TYPE, String.class);
        if (!Objects.equals(type, tokenType)) {
            throw ApiStatusException.unauthorized(SecurityConstant.ERROR_MESSAGE_BAD_CREDENTIAL, "ERR_JWT_INVALID_TYPE");
        }

        String issuer = claims.getIssuer();
        if (!Objects.equals(issuer, storeSecurityProperties.getIssuer())) {
            throw ApiStatusException.unauthorized(SecurityConstant.ERROR_MESSAGE_BAD_CREDENTIAL, "ERR_JWT_INVALID_ISS");
        }

        if (!claims.getAudience().contains(storeSecurityProperties.getAudience())) {
            throw ApiStatusException.unauthorized(SecurityConstant.ERROR_MESSAGE_BAD_CREDENTIAL, "ERR_JWT_INVALID_AUD");
        }

        String subject = claims.getSubject();

        return UUID.fromString(subject);
    }

    public void verifyPassword(LoginRequest request, UserAuthentication localAuth) {
        if (!passwordEncoder.matches(request.getPassword(), localAuth.getPassword())) {
            throw ApiStatusException.badRequest(SecurityConstant.ERROR_MESSAGE_EMAIL_PASSWORD_INVALID, SecurityConstant.ERROR_CODE_EMAIL_PASSWORD_INVALID);
        }
    }
}
