package hust.edu.vn.backend.dto.admin.request;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain=true)
public class ProductInfoDetailUpdateRequest {
    private List<Dto> dataList;

    @Data
    @Accessors(chain = true)
    public static class Dto {
        private String productDetailId;
        private String colorId;
        private Integer quantity;
        private Integer size;
    }
}
