package hust.edu.vn.backend.utility;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Objects;
import java.util.UUID;

@UtilityClass
public class ContextUtility {
    private static final UUID SYSTEM_UUID = UUID.fromString("00000000-0000-0000-0000-000000000000");
    public UUID getUserId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.isNull(authentication)){
            return SYSTEM_UUID;
        }

        return UUID.randomUUID();
    }
}
