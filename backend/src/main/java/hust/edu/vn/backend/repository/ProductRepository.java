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
    LEFT JOIN FETCH p.images
    WHERE p.id = :id
    """)
    Optional<Product> findByIdWithAllRelations(@Param("id") UUID id);

}
