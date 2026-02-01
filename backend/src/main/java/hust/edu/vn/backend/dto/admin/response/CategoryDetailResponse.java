package hust.edu.vn.backend.dto.admin.response;

import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;
import java.util.List;

@Data
@Accessors(chain=true)
public class CategoryDetailResponse {
    private String id;
    private String nameEn;
    private String nameVi;
    private String keyword;
    private Instant modifiedAt;
    private List<CategoryBannerResponse> banners;
}
