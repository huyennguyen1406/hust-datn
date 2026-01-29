package hust.edu.vn.backend.dto.admin.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class BrandCreateRequest {
    @NotBlank
    private String brandName;
    private String description;

}
