package hust.edu.vn.backend.config;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix = "cloudflare.r2")
@NoArgsConstructor
public class BucketProperties {
    private String accessKey;
    private String secretKey;
    private String accountId;
    private String bucketName;
    private String publicUrl;
    private String region;
}
