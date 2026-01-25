package hust.edu.vn.backend.dto.common.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class UserInformation {
    private String email;
    private String firstName;
    private String lastName;
    private String imageLink;
    private List<String> roles;

}
