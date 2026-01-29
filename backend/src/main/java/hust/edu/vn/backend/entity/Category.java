package hust.edu.vn.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Entity
@Table(name = "category")
@Getter
@Setter
@NoArgsConstructor
@ToString
@Accessors(chain = true)
@EntityListeners(AuditingEntityListener.class)
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @Column(name = "name_vi", nullable = false)
    private String nameVi;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "modified_at")
    private Instant modifiedAt;

    @Column(name = "modified_by")
    private String modifiedBy;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "category_product",
            joinColumns = @JoinColumn(name = "category_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> products = new HashSet<>();

    @OneToMany(fetch =  FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Set<CategoryBanner> banners = new HashSet<>();
}