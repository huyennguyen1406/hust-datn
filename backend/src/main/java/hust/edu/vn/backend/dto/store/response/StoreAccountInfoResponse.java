package hust.edu.vn.backend.dto.store.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class StoreAccountInfoResponse {
    private String email;
    private String firstName;
    private String lastName;
    private String imageLink;
    private String phoneNumber;
}
