package hust.edu.vn.backend.dto.store.response;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class StoreBrandResponse {
    private String value;
    private String name;
    private String brandId;
}
