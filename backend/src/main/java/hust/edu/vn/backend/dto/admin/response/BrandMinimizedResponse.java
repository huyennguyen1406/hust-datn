package hust.edu.vn.backend.dto.admin.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class BrandMinimizedResponse {
    private String id;
    private String brandName;

}
