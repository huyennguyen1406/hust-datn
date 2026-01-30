package hust.edu.vn.backend.dto.admin.response;

import hust.edu.vn.backend.entity.Voucher;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class VoucherResponse {
    private String code;
    private Instant startTime;
    private Instant endTime;
    private Integer discountAmount;
    private Integer voucherAmount;
    private Instant modifiedAt;

    public static VoucherResponse fromEntity(Voucher entity) {
        return new VoucherResponse()
                .setCode(entity.getCode())
                .setStartTime(entity.getStartTime())
                .setEndTime(entity.getEndTime())
                .setDiscountAmount(entity.getDiscountAmount())
                .setVoucherAmount(entity.getVoucherAmount())
                .setModifiedAt(entity.getModifiedAt());
    }
}
