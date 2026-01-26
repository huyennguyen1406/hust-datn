package hust.edu.vn.backend.dto.common.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class LoginRequest {
    @Email(message = "Email must be a valid email address")
    private String email;
    @NotBlank(message = "Password is required")
    private String password;
}
