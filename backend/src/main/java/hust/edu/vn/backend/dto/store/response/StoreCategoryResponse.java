package hust.edu.vn.backend.dto.store.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Data
public class StoreCategoryResponse {
    private String value;
    private String nameEn;
    private String nameVi;
    private String categoryId;
}
