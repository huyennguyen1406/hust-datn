package hust.edu.vn.backend.dto.store.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class StoreProvinceResponse {
    private Integer id;
    private String nameEn;
    private String nameVi;
}
