package hust.edu.vn.backend.dto.admin.response;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;
import java.util.List;

@Data
@Accessors(chain=true)
public class ProductDetailResponse {
    private String id;
    private String productNameEn;
    private String productNameVi;
    private Integer price;
    private BrandDto brand;
    private List<CategoryDto> categoryList;
    private Instant modifiedAt;
    private List<ProductImageDto> imageList;

    @Data
    @Accessors(chain = true)
    public static class BrandDto {
        private String brandId;
        private String brandName;
    }

    @Data
    @Accessors(chain = true)
    public static class CategoryDto {
        private String categoryId;
        private String categoryNameEn;
        private String categoryNameVi;
    }

    @Data
    @Accessors(chain = true)
    public static class ProductImageDto {
        private String imageId;
        private String imageUrl;
    }
}
