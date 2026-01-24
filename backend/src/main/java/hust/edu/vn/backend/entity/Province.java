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
@Table(name = "province")
@Getter
@Setter
@NoArgsConstructor
@ToString
@Accessors(chain = true)
@EntityListeners(AuditingEntityListener.class)
public class Province {
    @Id
    private Integer id;
    @Column(name = "name_en", nullable = false)
    private String nameEn;
    @Column(name = "name_vi", nullable = false)
    private String nameVi;
    @CreatedDate
    @Column(name = "created_at", updatable = false,  nullable = false)
    private Instant createdAt;
    @LastModifiedDate
    @Column(name = "modified_at")
    private Instant modifiedAt;
    @LastModifiedBy
    @Column(name = "modified_by")
    private UUID modifiedBy;
}
