package hust.edu.vn.backend.dto.admin.request;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain=true)
public class CategoryCreateRequest {
    private String nameEn;
    private String nameVi;
    private String keyword;
    private List<CategoryBannerRequest> banners;

}
