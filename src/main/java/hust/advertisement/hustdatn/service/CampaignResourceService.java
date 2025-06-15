package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.entities.Campaign;
import hust.advertisement.hustdatn.model.entities.CampaignResource;
import hust.advertisement.hustdatn.repository.CampaignRepository;
import hust.advertisement.hustdatn.repository.CampaignResourceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

public class CampaignResourceService {
	private final CampaignResourceRepository resourceRepository;
	private final CampaignRepository campaignRepository;
	
	public CampaignResourceService(CampaignResourceRepository resourceRepository, CampaignRepository campaignRepository) {
		this.resourceRepository = resourceRepository;
		this.campaignRepository = campaignRepository;
	}
	
	public List<CampaignResource> getResourcesByCampaignId(UUID campaignId) {
		if (!campaignRepository.existsById(campaignId)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found");
		}
		return resourceRepository.findByCampaignId(campaignId);
	}
	
	public CampaignResource getResourceById(UUID resourceId) {
		return resourceRepository.findById(resourceId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found"));
	}
	
	public CampaignResource addResourceToCampaign(UUID campaignId, CampaignResource resource) {
		Campaign campaign = campaignRepository.findById(campaignId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found"));
		
		resource.setCampaign(campaign);
		return resourceRepository.save(resource);
	}
	
	public CampaignResource updateResource(UUID campaignId, UUID resourceId, CampaignResource resourceUpdates) {
		CampaignResource existing = resourceRepository.findById(resourceId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found"));
		
		// Verify resource belongs to the specified campaign
		if (!existing.getCampaign().getId().equals(campaignId)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resource does not belong to this campaign");
		}
		
		// Update fields if they are not null in the updates
		if (resourceUpdates.getObjectId() != null) {
			existing.setObjectId(resourceUpdates.getObjectId());
		}
		if (resourceUpdates.getMimeType() != null) {
			existing.setMimeType(resourceUpdates.getMimeType());
		}
		if (resourceUpdates.getDisplaySecond() != null) {
			existing.setDisplaySecond(resourceUpdates.getDisplaySecond());
		}
		if (resourceUpdates.getOrder() != null) {
			existing.setOrder(resourceUpdates.getOrder());
		}
		
		return resourceRepository.save(existing);
	}
	
	public void removeResource(UUID campaignId, UUID resourceId) {
		CampaignResource resource = resourceRepository.findById(resourceId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found"));
		
		// Verify resource belongs to the specified campaign
		if (!resource.getCampaign().getId().equals(campaignId)) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resource does not belong to this campaign");
		}
		
		resourceRepository.delete(resource);
	}
}
