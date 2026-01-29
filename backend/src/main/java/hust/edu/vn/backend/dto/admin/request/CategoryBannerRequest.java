package hust.edu.vn.backend.dto.admin.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class CategoryBannerRequest {
    private String id;
    private String titleEn;
    private String titleVi;
    private String descriptionEn;
    private String descriptionVi;
    private Integer imageIndex;
}
