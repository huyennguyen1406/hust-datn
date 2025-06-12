package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.dto.BillboardDto;
import hust.advertisement.hustdatn.model.entities.Billboard;
import hust.advertisement.hustdatn.repository.BillboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BillboardService {
	private final BillboardRepository billboardRepository;
	
	@Autowired
	public BillboardService(BillboardRepository billboardRepository) {
		this.billboardRepository = billboardRepository;
	}
	
	public BillboardDto createBillboard(BillboardDto createDto) {
		Billboard billboard = Billboard.builder()
				.id(UUID.randomUUID())
				.tenantId(createDto.getTenantId())
				.name(createDto.getName())
				.description(createDto.getDescription())
				.code(createDto.getCode())
				.type(createDto.getType())
				.dimensionWidth(createDto.getDimensionWidth())
				.dimensionHeight(createDto.getDimensionHeight())
				.dimensionInches(createDto.getDimensionInches())
				.addressProvince(createDto.getAddressProvince())
				.addressDistrict(createDto.getAddressDistrict())
				.addressWard(createDto.getAddressWard())
				.addressType(createDto.getAddressType())
				.addressDescription(createDto.getAddressDescription())
				.addressCategory(createDto.getAddressCategory())
				.status(createDto.getStatus())
				.isLinked(createDto.getIsLinked())
				.linkedUserId(createDto.getLinkedUserId())
				.isConnected(createDto.getIsConnected())
				.phone(createDto.getPhone())
				.email(createDto.getEmail())
				.extraProperties(createDto.getEmail())
				.concurrencyStamp(UUID.randomUUID().toString())
				.creationTime(LocalDateTime.now())
				.isDeleted(false)
				.build();
		
		billboard = billboardRepository.save(billboard);
		return mapToResponseDto(billboard);
	}
	
	public BillboardDto getBillboardById(UUID id) {
		Billboard billboard = billboardRepository.findById(id)
				.filter(b -> !b.getIsDeleted())
				.orElseThrow(() -> new RuntimeException("Billboard not found or deleted"));
		return mapToResponseDto(billboard);
	}
	
	public List<BillboardDto> getBillboardsByTenantId(UUID tenantId) {
		return billboardRepository.findByTenantIdAndIsDeletedFalse(tenantId)
				.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());
	}
	
	public List<BillboardDto> getBillboardsByStatus(Integer status) {
		return billboardRepository.findByStatusAndIsDeletedFalse(status)
				.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());
	}
	
	public BillboardDto updateBillboard(UUID id, BillboardDto updateDto) {
		Billboard billboard = billboardRepository.findById(id)
				.filter(b -> !b.getIsDeleted())
				.orElseThrow(() -> new RuntimeException("Billboard not found or deleted"));
		
		if (updateDto.getName() != null) billboard.setName(updateDto.getName());
		if (updateDto.getDescription() != null) billboard.setDescription(updateDto.getDescription());
		if (updateDto.getCode() != null) billboard.setCode(updateDto.getCode());
		if (updateDto.getType() != null) billboard.setType(updateDto.getType());
		if (updateDto.getDimensionWidth() != null) billboard.setDimensionWidth(updateDto.getDimensionWidth());
		if (updateDto.getDimensionHeight() != null) billboard.setDimensionHeight(updateDto.getDimensionHeight());
		if (updateDto.getDimensionInches() != null) billboard.setDimensionInches(updateDto.getDimensionInches());
		if (updateDto.getAddressProvince() != null) billboard.setAddressProvince(updateDto.getAddressProvince());
		if (updateDto.getAddressDistrict() != null) billboard.setAddressDistrict(updateDto.getAddressDistrict());
		if (updateDto.getAddressWard() != null) billboard.setAddressWard(updateDto.getAddressWard());
		if (updateDto.getAddressType() != null) billboard.setAddressType(updateDto.getAddressType());
		if (updateDto.getAddressDescription() != null) billboard.setAddressDescription(updateDto.getAddressDescription());
		if (updateDto.getAddressCategory() != null) billboard.setAddressCategory(updateDto.getAddressCategory());
		if (updateDto.getStatus() != null) billboard.setStatus(updateDto.getStatus());
		if (updateDto.getIsLinked() != null) billboard.setIsLinked(updateDto.getIsLinked());
		if (updateDto.getLinkedUserId() != null) billboard.setLinkedUserId(updateDto.getLinkedUserId());
		if (updateDto.getIsConnected() != null) billboard.setIsConnected(updateDto.getIsConnected());
		if (updateDto.getPhone() != null) billboard.setPhone(updateDto.getPhone());
		if (updateDto.getEmail() != null) billboard.setEmail(updateDto.getEmail());
		if (updateDto.getId() != null) billboard.setExtraProperties(updateDto.getName());
		billboard.setLastModificationTime(LocalDateTime.now());
		billboard.setConcurrencyStamp(UUID.randomUUID().toString());
		
		billboard = billboardRepository.save(billboard);
		return mapToResponseDto(billboard);
	}
	
	public void deleteBillboard(UUID id) {
		Billboard billboard = billboardRepository.findById(id)
				.filter(b -> !b.getIsDeleted())
				.orElseThrow(() -> new RuntimeException("Billboard not found or deleted"));
		billboard.setIsDeleted(true);
		billboard.setDeletionTime(LocalDateTime.now());
		billboardRepository.save(billboard);
	}
	
	private BillboardDto mapToResponseDto(Billboard billboard) {
		return BillboardDto.classBuilder()
				.id(billboard.getId())
				.tenantId(billboard.getTenantId())
				.name(billboard.getName())
				.description(billboard.getDescription())
				.code(billboard.getCode())
				.type(billboard.getType())
				.dimensionWidth(billboard.getDimensionWidth())
				.dimensionHeight(billboard.getDimensionHeight())
				.dimensionInches(billboard.getDimensionInches())
				.addressProvince(billboard.getAddressProvince())
				.addressDistrict(billboard.getAddressDistrict())
				.addressWard(billboard.getAddressWard())
				.addressType(billboard.getAddressType())
				.addressDescription(billboard.getAddressDescription())
				.addressCategory(billboard.getAddressCategory())
				.status(billboard.getStatus())
				.isLinked(billboard.getIsLinked())
				.linkedUserId(billboard.getLinkedUserId())
				.isConnected(billboard.getIsConnected())
				.phone(billboard.getPhone())
				.email(billboard.getEmail())
				.extraProperties(billboard.getExtraProperties())
				.build();
	}
}
