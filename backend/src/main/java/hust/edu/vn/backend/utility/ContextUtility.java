package hust.edu.vn.backend.utility;

import hust.edu.vn.backend.exception.ApiStatusException;
import hust.edu.vn.backend.security.dto.UserPrincipal;
import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Objects;
import java.util.UUID;

import static hust.edu.vn.backend.security.constant.SecurityConstant.ERROR_MESSAGE_INVALID_SECURITY_SETUP;

@UtilityClass
public class ContextUtility {
    private static final UUID SYSTEM_UUID = UUID.fromString("00000000-0000-0000-0000-000000000000");
    public UUID getUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.isNull(authentication)){
            return SYSTEM_UUID;
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserPrincipal userPrincipal){
            return userPrincipal.getId();
        }

        if ("anonymousUser".equals(principal)){
            return SYSTEM_UUID;
        }

        throw ApiStatusException.internalServerError(ERROR_MESSAGE_INVALID_SECURITY_SETUP, "PRINCIPAL_NOT_USER");
    }

    public String getEmail(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.isNull(authentication)){
            throw ApiStatusException.internalServerError(ERROR_MESSAGE_INVALID_SECURITY_SETUP, "UNEXPECTED_ANONYMOUS");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof UserPrincipal userPrincipal){
            return userPrincipal.getEmail();
        } else {
            throw ApiStatusException.internalServerError(ERROR_MESSAGE_INVALID_SECURITY_SETUP, "UNEXPECTED_ANONYMOUS");
        }
    }
}
