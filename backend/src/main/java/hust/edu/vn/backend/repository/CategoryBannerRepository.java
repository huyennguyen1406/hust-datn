package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.CategoryBanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CategoryBannerRepository extends JpaRepository<CategoryBanner, UUID> {
    @Query("""
        SELECT cb
        FROM CategoryBanner cb
        WHERE cb.category.keyword = :keyword
        ORDER BY cb.createdAt DESC
    """)
    List<CategoryBanner> findAllByKeyword(@Param("keyword") String keyword);

}
