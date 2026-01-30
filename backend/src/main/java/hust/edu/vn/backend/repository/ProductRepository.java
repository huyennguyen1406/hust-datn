package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.Product;
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
}
