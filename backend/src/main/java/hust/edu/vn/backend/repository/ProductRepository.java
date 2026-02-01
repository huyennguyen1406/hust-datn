package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
    @Query("""
    SELECT DISTINCT p
    FROM Product p
    LEFT JOIN FETCH p.brand
    LEFT JOIN FETCH p.categories
    WHERE p.id = :id
""")
    Optional<Product> findByIdWithCategories(@Param("id") UUID id);

    @Query("""
    SELECT DISTINCT p
    FROM Product p
    LEFT JOIN FETCH p.images
    WHERE p = :product
    """)
    Product fetchImages(@Param("product") Product product);

    default Optional<Product> findByIdWithAllRelations(UUID id) {
        Optional<Product> product = findByIdWithCategories(id);
        product.ifPresent(this::fetchImages);
        return product;
    }


    @Query("""
        SELECT DISTINCT p
        FROM Product p
        JOIN p.categories c
        JOIN p.brand b        
        LEFT JOIN ProductDetail d ON d.product = p
        LEFT JOIN d.color col
        WHERE
        (:categoryKeyword IS NULL OR
            LOWER(c.nameEn) LIKE LOWER(CONCAT('%', :categoryKeyword, '%')) OR
            LOWER(c.nameVi) LIKE LOWER(CONCAT('%', :categoryKeyword, '%'))
        )
        AND
        (:productName IS NULL OR
            LOWER(p.nameEn) LIKE LOWER(CONCAT('%', :productName, '%')) OR
            LOWER(p.nameVi) LIKE LOWER(CONCAT('%', :productName, '%'))
        )
        AND
            (:brand IS NULL OR LOWER(b.brandName) = LOWER(:brand))
        
        AND
        (:shoeSize IS NULL OR d.size = :shoeSize)
        AND
        (:color IS NULL OR LOWER(col.hexCode) = LOWER(:color))
        """)
    Page<Product> searchProducts(
            @Param("categoryKeyword") String categoryKeyword,
            @Param("productName") String productName,
            @Param("brand") String brand,
            @Param("shoeSize") Integer shoeSize,
            @Param("color") String color,
            Pageable pageable
    );

}
