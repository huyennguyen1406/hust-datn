package hust.edu.vn.backend.dto.admin.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class CategoryBannerResponse {
    private String id;
    private String imageLink;
    private String titleEn;
    private String titleVi;
    private String descriptionEn;
    private String descriptionVi;
}
