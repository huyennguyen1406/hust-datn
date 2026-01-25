package hust.edu.vn.backend.security.config;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix = "security.dashboard")
@NoArgsConstructor
public class DashboardSecurityProperties {
    private String secret;
    private int accessTokenExpiration;
    private int refreshTokenExpiration;
    private String issuer;
    private String audience;
}
