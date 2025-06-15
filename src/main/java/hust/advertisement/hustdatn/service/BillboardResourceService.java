package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.dto.BillboardResourceDto;
import hust.advertisement.hustdatn.model.entities.Billboard;
import hust.advertisement.hustdatn.model.entities.BillboardResource;
import hust.advertisement.hustdatn.repository.BillboardRepository;
import hust.advertisement.hustdatn.repository.BillboardResourceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class BillboardResourceService {
	private final BillboardResourceRepository resourceRepository;
	private final BillboardRepository billboardRepository;
	
	public List<BillboardResource> getResourcesByBillboardId(UUID billboardId) {
		if (!billboardRepository.existsById(billboardId)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND,
					"Billboard not found with id: " + billboardId);
		}
		return resourceRepository.findByBillboardIdOrderByOrderAsc(billboardId);
	}
	
	public BillboardResource getResourceById(UUID billboardId, UUID resourceId) {
		return resourceRepository.findByBillboardIdAndId(billboardId, resourceId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
						"Resource not found or doesn't belong to billboard"));
	}
	
	public BillboardResource createResource(UUID billboardId, BillboardResource resource) {
		Billboard billboard = billboardRepository.findById(billboardId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
						"Billboard not found with id: " + billboardId));
		
		// Validate required fields
		if (resource.getObjectId() == null || resource.getObjectId().isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"Object ID is required");
		}
		
		if (resource.getMimeType() == null || resource.getMimeType().isBlank()) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"MIME type is required");
		}
		
		// Set default order if not provided
		if (resource.getOrder() == null) {
			resource.setOrder(getNextAvailableOrder(billboardId));
		}
		
		resource.setBillboard(billboard);
		return resourceRepository.save(resource);
	}
	
	public BillboardResource updateResource(
			UUID billboardId,
			UUID resourceId,
			BillboardResource resourceUpdates) {
		BillboardResource existing = getResourceById(billboardId, resourceId);
		
		// Update only non-null fields
		if (resourceUpdates.getObjectId() != null) {
			existing.setObjectId(resourceUpdates.getObjectId());
		}
		if (resourceUpdates.getMimeType() != null) {
			existing.setMimeType(resourceUpdates.getMimeType());
		}
		if (resourceUpdates.getOrder() != null &&
				!resourceUpdates.getOrder().equals(existing.getOrder())) {
			updateResourceOrder(existing, resourceUpdates.getOrder());
		}
		
		return resourceRepository.save(existing);
	}
	
	public void deleteResource(UUID billboardId, UUID resourceId) {
		BillboardResource resource = getResourceById(billboardId, resourceId);
		resourceRepository.delete(resource);
		reorderResourcesAfterDeletion(billboardId, resource.getOrder());
	}
	
	public void updateResourceDisplayOrder(UUID billboardId, List<UUID> resourceIdsInOrder) {
		List<BillboardResource> resources = resourceRepository.findAllById(resourceIdsInOrder);
		
		// Verify all resources belong to the billboard
		resources.forEach(resource -> {
			if (!resource.getBillboard().getId().equals(billboardId)) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
						"Resource " + resource.getId() + " doesn't belong to billboard");
			}
		});
		
		// Update orders sequentially
		for (int i = 0; i < resources.size(); i++) {
			resources.get(i).setOrder(i);
		}
		
		resourceRepository.saveAll(resources);
	}
	
	private Integer getNextAvailableOrder(UUID billboardId) {
		Integer maxOrder = resourceRepository.findMaxOrderByBillboardId(billboardId);
		return maxOrder != null ? maxOrder + 1 : 0;
	}
	
	private void updateResourceOrder(BillboardResource resource, Integer newOrder) {
		List<BillboardResource> resourcesToUpdate = new ArrayList<>();
		
		if (newOrder > resource.getOrder()) {
			// Moving down - decrease order of resources between old and new position
			List<BillboardResource> affectedResources = resourceRepository
					.findByBillboardIdAndOrderBetween(
							resource.getBillboard().getId(),
							resource.getOrder() + 1,
							newOrder);
			
			affectedResources.forEach(r -> {
				r.setOrder(r.getOrder() - 1);
				resourcesToUpdate.add(r);
			});
		} else {
			// Moving up - increase order of resources between new and old position
			List<BillboardResource> affectedResources = resourceRepository
					.findByBillboardIdAndOrderBetween(
							resource.getBillboard().getId(),
							newOrder,
							resource.getOrder() - 1);
			
			affectedResources.forEach(r -> {
				r.setOrder(r.getOrder() + 1);
				resourcesToUpdate.add(r);
			});
		}
		
		resource.setOrder(newOrder);
		resourcesToUpdate.add(resource);
		resourceRepository.saveAll(resourcesToUpdate);
	}
	
	private void reorderResourcesAfterDeletion(UUID billboardId, Integer deletedOrder) {
		List<BillboardResource> resources = resourceRepository
				.findByBillboardIdAndOrderGreaterThan(billboardId, deletedOrder);
		
		resources.forEach(r -> r.setOrder(r.getOrder() - 1));
		resourceRepository.saveAll(resources);
	}
}
