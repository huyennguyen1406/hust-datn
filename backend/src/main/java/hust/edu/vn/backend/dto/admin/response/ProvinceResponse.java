package hust.edu.vn.backend.dto.admin.response;

import hust.edu.vn.backend.entity.Province;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain=true)
public class ProvinceResponse {
    private Integer id;
    private String nameEn;
    private String nameVi;
    private Instant modifiedAt;

    public static ProvinceResponse fromEntity(Province province) {
        return new ProvinceResponse()
                .setId(province.getId())
                .setNameEn(province.getNameEn())
                .setNameVi(province.getNameVi())
                .setModifiedAt(province.getModifiedAt());
    }
}
