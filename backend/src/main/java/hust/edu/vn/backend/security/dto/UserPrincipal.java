package hust.edu.vn.backend.security.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.UUID;

@Getter
@Setter
@Accessors(chain = true)
public class UserPrincipal {
    private UUID id;
    private String email;
}
