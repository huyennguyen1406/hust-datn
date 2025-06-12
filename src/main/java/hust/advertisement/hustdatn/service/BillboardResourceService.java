package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.dto.BillboardResourceDto;
import hust.advertisement.hustdatn.model.entities.Billboard;
import hust.advertisement.hustdatn.model.entities.BillboardResource;
import hust.advertisement.hustdatn.repository.BillboardRepository;
import hust.advertisement.hustdatn.repository.BillboardResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
@Service
public class BillboardResourceService {
	private final BillboardResourceRepository billboardResourceRepository;
	private final BillboardRepository billboardRepository;
	
	@Autowired
	public BillboardResourceService(BillboardResourceRepository billboardResourceRepository, BillboardRepository billboardRepository) {
		this.billboardResourceRepository = billboardResourceRepository;
		this.billboardRepository = billboardRepository;
	}
	
	public BillboardResourceDto createBillboardResource(BillboardResourceDto createDto) {
		Billboard billboard = billboardRepository.findById(createDto.getId())
				.filter(b -> !b.getIsDeleted())
				.orElseThrow(() -> new RuntimeException("Billboard not found or deleted"));
		
		BillboardResource resource = BillboardResource.builder()
				.id(UUID.randomUUID())
				.tenantId(createDto.getTenantId())
				.objectId(createDto.getObjectId())
				.mimeType(createDto.getMimeType())
				.order(createDto.getOrder())
				.billboard(billboard)
				.build();
		
		resource = billboardResourceRepository.save(resource);
		return mapToResponseDto(resource);
	}
	
	public BillboardResourceDto getBillboardResourceById(UUID id) {
		BillboardResource resource = billboardResourceRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BillboardResource not found"));
		return mapToResponseDto(resource);
	}
	
	public List<BillboardResourceDto> getBillboardResourcesByBillboardId(UUID billboardId) {
		return billboardResourceRepository.findByBillboardId(billboardId)
				.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());
	}
	
	public void deleteBillboardResource(UUID id) {
		BillboardResource resource = billboardResourceRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BillboardResource not found"));
		billboardResourceRepository.delete(resource);
	}
	
	private BillboardResourceDto mapToResponseDto(BillboardResource resource) {
		return BillboardResourceDto.builder()
				.id(resource.getId())
				.tenantId(resource.getTenantId())
				.objectId(resource.getObjectId())
				.mimeType(resource.getMimeType())
				.order(resource.getOrder())
				.billboardId(resource.getBillboard().getId())
				.build();
	}
}
