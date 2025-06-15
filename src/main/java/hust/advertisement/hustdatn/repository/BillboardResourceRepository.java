package hust.advertisement.hustdatn.repository;

import hust.advertisement.hustdatn.model.entities.BillboardResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BillboardResourceRepository extends JpaRepository<BillboardResource, UUID> {
	List<BillboardResource> findByBillboardIdOrderByOrderAsc(UUID billboardId);
	
	Optional<BillboardResource> findByBillboardIdAndId(UUID billboardId, UUID resourceId);
	
	@Query("SELECT MAX(r.order) FROM BillboardResource r WHERE r.billboard.id = :billboardId")
	Integer findMaxOrderByBillboardId(@Param("billboardId") UUID billboardId);
	
	List<BillboardResource> findByBillboardIdAndOrderBetween(
			@Param("billboardId") UUID billboardId,
			@Param("orderFrom") Integer orderFrom,
			@Param("orderTo") Integer orderTo);
	
	List<BillboardResource> findByBillboardIdAndOrderGreaterThan(
			@Param("billboardId") UUID billboardId,
			@Param("order") Integer order);
}
