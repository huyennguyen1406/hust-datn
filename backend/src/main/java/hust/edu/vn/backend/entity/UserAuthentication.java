package hust.edu.vn.backend.entity;

import hust.edu.vn.backend.security.constant.SecurityConstant;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "user_authentication")
@Getter
@Setter
@NoArgsConstructor
@ToString
@Accessors(chain = true)
@EntityListeners(AuditingEntityListener.class)
public class UserAuthentication {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @Column(name = "provider", nullable = false)
    private String provider;

    @Column(name = "provider_user_id", nullable = false)
    private String providerUserId;

    @Column(name = "password")
    private String password;

    @CreatedDate
    @Column(name = "created_at", updatable = false,  nullable = false)
    private Instant createdAt;
    @LastModifiedDate
    @Column(name = "modified_at")
    private Instant modifiedAt;

    @PrePersist
    @PreUpdate
    private void syncProviderUserId() {
        if (Objects.equals(SecurityConstant.LOCAL, provider)
                && providerUserId == null
                && user != null
                && user.getId() != null) {

            this.providerUserId = user.getId().toString();
        }
    }
}
