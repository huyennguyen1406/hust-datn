package hust.edu.vn.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import java.net.URI;

@Configuration
@RequiredArgsConstructor
public class R2Config {
    private final BucketProperties bucketProperties;

    @Bean
    public S3Client r2Client() {
        return S3Client.builder()
                .endpointOverride(
                        URI.create("https://" + bucketProperties.getAccountId() + ".r2.cloudflarestorage.com")
                )
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(bucketProperties.getAccessKey(), bucketProperties.getSecretKey())
                        )
                )
                .region(Region.of(bucketProperties.getRegion()))
                .build();
    }
}

