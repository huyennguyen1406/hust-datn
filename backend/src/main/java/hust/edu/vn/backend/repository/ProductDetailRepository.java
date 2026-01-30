package hust.edu.vn.backend.repository;

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
}
