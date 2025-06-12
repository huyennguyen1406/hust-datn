package hust.advertisement.hustdatn.repository;

import hust.advertisement.hustdatn.model.entities.BillboardResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BillboardResourceRepository extends JpaRepository<BillboardResource, UUID> {
	List<BillboardResource> findByBillboardId(UUID billboardId);
}
