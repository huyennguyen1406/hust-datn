package hust.edu.vn.backend.dto.admin.response;

import hust.edu.vn.backend.entity.Brand;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain=true)
public class BrandResponse {
    private String id;
    private String brandName;
    private String description;
    private String brandLogo;
    private Instant modifiedAt;

    public static BrandResponse fromEntity(Brand brand) {
        return new BrandResponse()
                .setId(brand.getId().toString())
                .setBrandName(brand.getBrandName())
                .setDescription(brand.getDescription())
                .setBrandLogo(brand.getBrandLogo())
                .setModifiedAt(brand.getModifiedAt());
    }

}
