package hust.edu.vn.backend.dto.admin.response;

import hust.edu.vn.backend.entity.District;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class DistrictResponse {
    private Integer id;
    private String nameEn;
    private String nameVi;
    private String provinceNameEn;
    private String provinceNameVi;
    private Instant modifiedAt;

    public static DistrictResponse fromEntity(District district) {
        return new DistrictResponse()
                .setId(district.getId())
                .setNameEn(district.getNameEn())
                .setNameVi(district.getNameVi())
                .setModifiedAt(district.getModifiedAt())
                .setProvinceNameEn(district.getProvince().getNameEn())
                .setProvinceNameVi(district.getProvince().getNameVi());
    }
}
