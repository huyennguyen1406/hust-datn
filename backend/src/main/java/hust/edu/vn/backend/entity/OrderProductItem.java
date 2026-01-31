package hust.edu.vn.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.UUID;

@Entity
@Table(name = "order_product_item")
@Getter
@Setter
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class OrderProductItem {

    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_order_id", nullable = false)
    private UserOrder userOrderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id", nullable = false)
    private ProductColor colorId;

    @Column(name = "unit_price", nullable = false)
    private Integer unitPrice;

    @Column(name = "size", nullable = false)
    private Integer size;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}
