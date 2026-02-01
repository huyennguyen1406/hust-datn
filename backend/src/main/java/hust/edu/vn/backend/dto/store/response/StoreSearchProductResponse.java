package hust.edu.vn.backend.dto.store.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class StoreSearchProductResponse {
    private String image;
    private String productNameEn;
    private String productNameVi;
    private String brandName;
    private boolean isSale = false;
    private Integer normalPrice;
    private Integer salePrice = null;
    private String productId;
    private Double rating = 0.0;
    private Integer reviewCount = 0;
}
