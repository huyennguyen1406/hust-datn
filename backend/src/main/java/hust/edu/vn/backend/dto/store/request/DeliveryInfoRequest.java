package hust.edu.vn.backend.dto.store.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.Length;

@Data
@Accessors(chain = true)
public class DeliveryInfoRequest {
    @NotBlank(message = "Deliver name cannot be blank")
    private String deliverName;

    @NotBlank(message = "Phone number cannot be blank")
    @Length(min = 10, max = 10)
    private String phoneNumber;

    @NotBlank
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Address cannot be blank")
    private String address;

    private Integer districtId;

    @NotBlank(message = "Postal code cannot be blank")
    private String postalCode;

    @NotBlank(message = "Country cannot be blank")
    private String country;

}
