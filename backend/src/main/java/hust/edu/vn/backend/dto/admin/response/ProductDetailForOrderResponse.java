package hust.edu.vn.backend.dto.admin.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductDetailForOrderResponse {
    private String productDetailId;
    private String colorHexCode;
    private String productNameEn;
    private String productNameVi;
    private Integer size;
    private Integer price;
    private String brandName;
    private Integer quantity;
    private String imageUrl;
}
