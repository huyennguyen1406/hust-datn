package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID>, JpaSpecificationExecutor<Category> {
    @Query("""
        SELECT DISTINCT c
        FROM Category c
        LEFT JOIN FETCH c.banners
        WHERE c.id = :id
    """)
    Optional<Category> findCategoryByIdWithBanners(@Param("id") UUID id);

}
