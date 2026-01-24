package hust.edu.vn.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ApiStatusException extends RuntimeException {
    private final HttpStatus status;
    private final String title;
    private final String message;
    private final String systemCode;

    public static ApiStatusException badRequest(String message, String systemCode) {
        return new ApiStatusException(HttpStatus.BAD_REQUEST, "Bad Request", message, systemCode);
    }

    public static ApiStatusException unauthorized(String message, String systemCode) {
        return new ApiStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized", message, systemCode);
    }

    public static ApiStatusException notFound(String message, String systemCode) {
        return new ApiStatusException(HttpStatus.NOT_FOUND, "Not Found", message, systemCode);
    }

    public static ApiStatusException internalServerError(String message, String systemCode) {
        return new ApiStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", message, systemCode);
    }

    public static ApiStatusException badGateway(String message, String systemCode) {
        return new ApiStatusException(HttpStatus.BAD_GATEWAY, "Bad Gateway", message, systemCode);
    }
}
