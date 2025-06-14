package hust.advertisement.hustdatn.repository;

import hust.advertisement.hustdatn.model.entities.BillboardTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface BillboardTagRepository extends JpaRepository<BillboardTag, UUID> {
	List<BillboardTag> findByBillboardId(UUID billboardId);
}
