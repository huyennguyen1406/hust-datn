package hust.edu.vn.backend.dto.admin.request;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain=true)
public class SimpleOrderRequest {
    private String appUserId;
    private List<OrderDto> orders;

    @Data
    @Accessors(chain=true)
    public static class OrderDto {
        private String productDetailId;
        private Integer quantity;
    }
}
