package hust.edu.vn.backend.dto.admin.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class ProductInfoDetailResponse {
    private String productDetailId;
    private String colorId;
    private String colorCode;
    private Integer quantity;
    private Integer size;
}
