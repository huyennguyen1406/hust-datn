package hust.edu.vn.backend.dto.admin.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class VoucherCreateRequest {
    @NotBlank(message = "Voucher code must not be blank")
    @Size(max = 255, message = "Voucher code must not exceed 255 characters")
    private String code;

    @NotNull(message = "Start time must not be null")
    private Instant startTime;

    @NotNull(message = "End time must not be null")
    private Instant endTime;

    @NotNull(message = "Discount amount must not be null")
    @Positive(message = "Discount amount must be greater than 0")
    private Integer discountAmount;

    @NotNull(message = "Voucher amount must not be null")
    @Positive(message = "Voucher amount must be greater than 0")
    private Integer voucherAmount;

}
