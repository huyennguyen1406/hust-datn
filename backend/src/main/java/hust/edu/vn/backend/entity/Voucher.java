package hust.edu.vn.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "voucher")
@Getter
@Setter
@NoArgsConstructor
@ToString
@Accessors(chain = true)
@EntityListeners(AuditingEntityListener.class)
public class Voucher {
    @Id
    @Column(name = "code", length = 255)
    private String code; // primary key

    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    @Column(name = "discount_amount", nullable = false)
    private Integer discountAmount;

    @Column(name = "voucher_amount", nullable = false)
    private Integer voucherAmount;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "modified_at")
    private Instant modifiedAt;

    @LastModifiedBy
    @Column(name = "modified_by")
    private UUID modifiedBy;
}
