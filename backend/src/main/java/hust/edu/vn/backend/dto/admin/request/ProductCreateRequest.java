package hust.edu.vn.backend.dto.admin.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;
import java.util.UUID;

@Data
@Accessors(chain = true)
public class ProductCreateRequest {
    @NotBlank
    private String nameEn;

    @NotBlank
    private String nameVi;

    @NotNull
    private UUID brandId;

    @NotNull
    private Integer price;

    private List<UUID> categoryIds;


}
