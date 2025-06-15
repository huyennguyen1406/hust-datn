package hust.advertisement.hustdatn.controller;

import hust.advertisement.hustdatn.model.entities.CampaignResource;
import hust.advertisement.hustdatn.service.CampaignResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/campaigns/{campaignId}/resources")
@RequiredArgsConstructor
public class CampaignController {
	private final CampaignResourceService resourceService;
	
	@GetMapping
	public List<CampaignResource> getCampaignResources(@PathVariable UUID campaignId) {
		return resourceService.getResourcesByCampaignId(campaignId);
	}
	
	@GetMapping("/{resourceId}")
	public CampaignResource getResource(
			@PathVariable UUID campaignId,
			@PathVariable UUID resourceId) {
		return resourceService.getResourceById(resourceId);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public CampaignResource addResourceToCampaign(
			@PathVariable UUID campaignId,
			@RequestBody CampaignResource resource) {
		return resourceService.addResourceToCampaign(campaignId, resource);
	}
	
	@PutMapping("/{resourceId}")
	public CampaignResource updateResource(
			@PathVariable UUID campaignId,
			@PathVariable UUID resourceId,
			@RequestBody CampaignResource resourceUpdates) {
		return resourceService.updateResource(campaignId, resourceId, resourceUpdates);
	}
	
	@DeleteMapping("/{resourceId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void removeResourceFromCampaign(
			@PathVariable UUID campaignId,
			@PathVariable UUID resourceId) {
		resourceService.removeResource(campaignId, resourceId);
	}
}
