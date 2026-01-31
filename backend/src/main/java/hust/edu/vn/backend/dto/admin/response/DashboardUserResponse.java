package hust.edu.vn.backend.dto.admin.response;

import hust.edu.vn.backend.entity.AppUser;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class DashboardUserResponse {
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Instant modifiedAt;

    public static DashboardUserResponse fromEntity(AppUser entity) {
        return new DashboardUserResponse()
                .setId(entity.getId().toString())
                .setEmail(entity.getEmail())
                .setFirstName(entity.getFirstName())
                .setLastName(entity.getLastName())
                .setPhoneNumber(entity.getPhoneNumber())
                .setModifiedAt(entity.getModifiedAt());
    }
}
