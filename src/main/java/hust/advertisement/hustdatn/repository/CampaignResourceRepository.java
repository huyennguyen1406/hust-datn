package hust.advertisement.hustdatn.repository;

import hust.advertisement.hustdatn.model.entities.CampaignResource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CampaignResourceRepository extends JpaRepository<CampaignResource, UUID> {
	List<CampaignResource> findByCampaignId(UUID campaignId);
}
