package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer>, JpaSpecificationExecutor<District> {
    @Query("""
        SELECT d
        FROM District d
        WHERE d.province.id = :provinceId
    """)
    List<District> findDistrictsByProvinceId(int provinceId);
}
