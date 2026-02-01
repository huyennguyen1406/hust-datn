package hust.edu.vn.backend.dto.store.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class StoreBannerResponse {
    private String imageLink;
    private String titleEn;
    private String titleVi;
    private String descriptionEn;
    private String descriptionVi;
}
