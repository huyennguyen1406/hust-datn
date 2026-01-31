package hust.edu.vn.backend.dto.store.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeliveryInfoWithStatus {
    private boolean hasDeliveryInfo;
    private DeliveryInfoResponse data;
}
