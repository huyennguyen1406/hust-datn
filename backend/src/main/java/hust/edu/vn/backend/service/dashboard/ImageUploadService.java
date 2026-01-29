package hust.edu.vn.backend.service.dashboard;

import hust.edu.vn.backend.config.BucketProperties;
import hust.edu.vn.backend.config.R2Config;
import hust.edu.vn.backend.exception.ApiStatusException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageUploadService {
    private final S3Client r2Client;
    private final BucketProperties bucketProperties;
    public String upload(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw ApiStatusException.badRequest("File is empty", "ERR_EMPTY_FILE");
            }

            if (!Objects.requireNonNull(file.getContentType()).startsWith("image/")) {
                throw ApiStatusException.badRequest("Only image file is allowed", "ERR_INVALID_FILE_TYPE");
            }

            String contentType = file.getContentType(); // e.g. image/jpeg
            String extension = switch (contentType) {
                case "image/jpeg" -> ".jpg";
                case "image/png" -> ".png";
                case "image/webp" -> ".webp";
                default -> throw ApiStatusException.badRequest("Unsupported image type: " + contentType, "ERR_UNSUPPORTED_IMAGE_TYPE");
            };

            String key = "images/" + UUID.randomUUID() + extension;

            r2Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketProperties.getBucketName())
                            .key(key)
                            .contentType(file.getContentType())
                            .build(),
                    RequestBody.fromBytes(file.getBytes())
            );

            return String.format("%s/%s", bucketProperties.getPublicUrl(), key);

        } catch (ApiStatusException e1) {
            throw e1;
        } catch (Exception e2){
            log.error("Error uploading image: {}", e2);
            throw ApiStatusException.internalServerError("Error uploading image", "ERR_UPLOAD_IMAGE");
        }
    }

}
