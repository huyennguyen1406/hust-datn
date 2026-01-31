package hust.edu.vn.backend.dto.store.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeliveryInfoResponse {
    private String deliverName;
    private String phoneNumber;
    private String email;
    private String address;
    private Integer provinceId;
    private Integer districtId;
    private String postalCode;
    private String country;
}
