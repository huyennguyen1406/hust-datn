package hust.edu.vn.backend.repository;

import hust.edu.vn.backend.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer>, JpaSpecificationExecutor<District> {
}
