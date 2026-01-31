package hust.edu.vn.backend.security.constant;

public class SecurityConstant {


    public static final String ERROR_MESSAGE_PHONE_NUMBER_EXISTED = "Phone number is already existed.";
    public static final String ERROR_CODE_PHONE_NUMBER_EXISTED = "ERR_PHONE_NUMBER_EXISTED";
    public static final String ERROR_MESSAGE_EMAIL_EXISTED = "Email is already existed.";
    public static final String ERROR_CODE_EMAIL_EXISTED = "ERR_EMAIL_EXISTED";

    private SecurityConstant() {}

    public static final String LOCAL = "local";

    public static final String ERROR_MESSAGE_EMAIL_PASSWORD_INVALID = "Email or password is invalid.";
    public static final String ERROR_MESSAGE_AUTHENTICATION_NOT_FOUND = "User authentication not found";
    public static final String ERROR_MESSAGE_USER_NOT_FOUND = "User not found.";
    public static final String ERROR_MESSAGE_BAD_CREDENTIAL = "Bad credential.";
    public static final String ERROR_MESSAGE_INVALID_SECURITY_SETUP = "Invalid security setup";

    public static final String ERROR_CODE_EMAIL_PASSWORD_INVALID = "ERR-EMAIL-PASSWORD-INVALID";
    public static final String ERROR_CODE_AUTHENTICATION_NOT_FOUND = "ERR-AUTHENTICATION-NOT-FOUND";
    public static final String ERROR_CODE_USER_NOT_FOUND = "ERR-USER-NOT-FOUND";
    public static final String ERROR_CODE_JWT_EXPIRED = "ERR-JWT-EXPIRED";
    public static final String ERROR_CODE_INVALID_SECURITY_SETUP = "ERR-INVALID-SECURITY-SETUP";
}
