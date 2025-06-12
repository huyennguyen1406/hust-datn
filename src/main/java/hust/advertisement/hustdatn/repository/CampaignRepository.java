package hust.advertisement.hustdatn.repository;

import hust.advertisement.hustdatn.model.entities.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface CampaignRepository extends JpaRepository<Campaign, UUID> {
	List<Campaign> findByTenantIdAndIsDeletedFalse(UUID tenantId);
	List<Campaign> findByStatusAndIsDeletedFalse(Integer status);
	
}
