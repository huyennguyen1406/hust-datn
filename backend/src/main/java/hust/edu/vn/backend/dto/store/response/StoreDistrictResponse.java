package hust.edu.vn.backend.dto.store.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class StoreDistrictResponse {
    private Integer id;
    private String nameEn;
    private String nameVi;
}
