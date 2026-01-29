package hust.edu.vn.backend.dto.admin.response;

import hust.edu.vn.backend.entity.Brand;
import hust.edu.vn.backend.entity.Category;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain=true)
public class CategoryResponse {
    private String id;
    private String nameEn;
    private String nameVi;
    private Instant modifiedAt;

    public static CategoryResponse fromEntity(Category category) {
        return new CategoryResponse()
                .setId(category.getId().toString())
                .setNameEn(category.getNameEn())
                .setNameVi(category.getNameVi())
                .setModifiedAt(category.getModifiedAt());
    }

}
