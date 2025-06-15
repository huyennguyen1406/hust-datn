package hust.advertisement.hustdatn.controller;

import hust.advertisement.hustdatn.model.entities.BillboardResource;
import hust.advertisement.hustdatn.service.BillboardResourceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class BillboardResourceController {
	private final BillboardResourceService billboardResourceService;
	
	@GetMapping
	public List<BillboardResource> getResourcesByBillboard(@PathVariable UUID billboardId) {
		return (List<BillboardResource>) billboardResourceService.getBillboardResourceById(billboardId);
	}
	
	@GetMapping("/{resourceId}")
	public BillboardResource getResource(
			@PathVariable UUID billboardId,
			@PathVariable UUID resourceId) {
		return resourceService.getResourceById(billboardId, resourceId);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public BillboardResource addResource(
			@PathVariable UUID billboardId,
			@RequestBody BillboardResource resource) {
		return resourceService.addResourceToBillboard(billboardId, resource);
	}
	
	@PutMapping("/{resourceId}")
	public BillboardResource updateResource(
			@PathVariable UUID billboardId,
			@PathVariable UUID resourceId,
			@RequestBody BillboardResource resourceUpdates) {
		return resourceService.updateResource(billboardId, resourceId, resourceUpdates);
	}
	
	@DeleteMapping("/{resourceId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void removeResource(
			@PathVariable UUID billboardId,
			@PathVariable UUID resourceId) {
		resourceService.removeResource(billboardId, resourceId);
	}
	
	@PutMapping("/{resourceId}/order/{newOrder}")
	public BillboardResource updateResourceOrder(
			@PathVariable UUID billboardId,
			@PathVariable UUID resourceId,
			@PathVariable Integer newOrder) {
		return resourceService.updateResourceOrder(billboardId, resourceId, newOrder);
	}
}
