package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.dto.BillboardTagDto;
import hust.advertisement.hustdatn.model.entities.Billboard;
import hust.advertisement.hustdatn.model.entities.BillboardTag;
import hust.advertisement.hustdatn.repository.BillboardRepository;
import hust.advertisement.hustdatn.repository.BillboardTagRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class BillboardTagService {
	private final BillboardTagRepository billboardTagRepository;
	private final BillboardRepository billboardRepository;
	
	@Autowired
	public BillboardTagService(BillboardTagRepository billboardTagRepository, BillboardRepository billboardRepository) {
		this.billboardTagRepository = billboardTagRepository;
		this.billboardRepository = billboardRepository;
	}
	
	public BillboardTagDto createBillboardTag(BillboardTagDto createDto) {
		Billboard billboard = billboardRepository.findById(createDto.getBillboardId())
				.filter(b -> !b.getIsDeleted())
				.orElseThrow(() -> new RuntimeException("Billboard not found or deleted"));
		
		BillboardTag tag = BillboardTag.builder()
				.id(UUID.randomUUID())
				.tenantId(createDto.getTenantId())
				.tag(createDto.getTag())
				.billboard(billboard)
				.build();
		
		tag = billboardTagRepository.save(tag);
		return mapToResponseDto(tag);
	}
	
	public BillboardTagDto getBillboardTagById(UUID id) {
		BillboardTag tag = billboardTagRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BillboardTag not found"));
		return mapToResponseDto(tag);
	}
	
	public List<BillboardTagDto> getBillboardTagsByBillboardId(UUID billboardId) {
		return billboardTagRepository.findByBillboardId(billboardId)
				.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());
	}
	
	public BillboardTagDto updateBillboardTag(UUID id, BillboardTagDto updateDto) {
		BillboardTag tag = billboardTagRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BillboardTag not found"));
		
		if (updateDto.getTag() != null) tag.setTag(updateDto.getTag());
		if (updateDto.getTag() != null) {
			Billboard billboard = billboardRepository.findById(updateDto.getId())
					.filter(b -> !b.getIsDeleted())
					.orElseThrow(() -> new RuntimeException("Billboard not found or deleted"));
			tag.setBillboard(billboard);
		}
		
		tag = billboardTagRepository.save(tag);
		return mapToResponseDto(tag);
	}
	
	public void deleteBillboardTag(UUID id) {
		BillboardTag tag = billboardTagRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("BillboardTag not found"));
		billboardTagRepository.delete(tag);
	}
	
	private BillboardTagDto mapToResponseDto(BillboardTag tag) {
		return BillboardTagDto.builder()
				.id(tag.getId())
				.tenantId(tag.getTenantId())
				.tag(tag.getTag())
				.billboardId(tag.getBillboard().getId())
				.build();
	}
}
