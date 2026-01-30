package hust.edu.vn.backend.dto.admin.response;

import hust.edu.vn.backend.entity.Product;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain=true)
public class ProductResponse {
    private String id;
    private String productNameEn;
    private String productNameVi;
    private String brandName;
    private Integer price;
    private Instant modifiedAt;

    public static ProductResponse fromEntity(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId().toString());
        response.setProductNameEn(product.getNameEn());
        response.setProductNameVi(product.getNameVi());
        response.setBrandName(product.getBrand().getBrandName());
        response.setPrice(product.getPrice());
        response.setModifiedAt(product.getModifiedAt());
        return response;
    }
}
