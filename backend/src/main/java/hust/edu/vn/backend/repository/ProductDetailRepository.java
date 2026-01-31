package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.dto.admin.response.ProductDetailForOrderResponse;
import hust.edu.vn.backend.entity.ProductDetail;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, UUID> {
    @Query("""
        select pd
        from ProductDetail pd
        join fetch pd.color c
        where pd.product.id = :productId
    """)
    List<ProductDetail> findByProductIdWithColor(@Param("productId") UUID productId);

    @Modifying
    @Transactional
    @Query("""
        delete from ProductDetail pd
        where pd.product.id = :productId
    """)
    void deleteByProductId(@Param("productId") UUID productId);

    @Query("""
    SELECT new hust.edu.vn.backend.dto.admin.response.ProductDetailForOrderResponse(
        CAST(pd.id AS string),
        c.hexCode,
        p.nameEn,
        p.nameVi,
        pd.size,
        p.price,
        b.brandName,
        pd.quantity,
        MIN(pi.imageLink)
    )
    FROM ProductDetail pd
    JOIN pd.color c
    JOIN pd.product p
    JOIN p.brand b
    LEFT JOIN p.images pi
    WHERE LOWER(p.nameEn) LIKE LOWER(CONCAT('%', :productName, '%'))
       OR LOWER(p.nameVi) LIKE LOWER(CONCAT('%', :productName, '%'))
    GROUP BY
        pd.id,
        c.hexCode,
        p.nameEn,
        p.nameVi,
        pd.size,
        p.price,
        b.brandName,
        pd.quantity
""")
    List<ProductDetailForOrderResponse> findProductDetailByProductName(
            @Param("productName") String productName
    );

}
