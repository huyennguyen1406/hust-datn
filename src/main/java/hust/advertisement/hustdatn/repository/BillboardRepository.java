package hust.advertisement.hustdatn.repository;

import hust.advertisement.hustdatn.model.entities.Billboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface BillboardRepository extends JpaRepository<Billboard, UUID> {
	List<Billboard> findByTenantIdAndIsDeletedFalse(UUID tenantId);
	List<Billboard> findByStatusAndIsDeletedFalse(Integer status);
}
