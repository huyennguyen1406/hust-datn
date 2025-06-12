package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.dto.CampaignDto;
import hust.advertisement.hustdatn.model.entities.Campaign;
import hust.advertisement.hustdatn.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class CampaignService {
	
	private final CampaignRepository campaignRepository;
	@Autowired
    public CampaignService(CampaignRepository campaignRepository) {
		this.campaignRepository = campaignRepository;
	}
	
	public CampaignDto createCampaign(CampaignDto createDto) {
		Campaign campaign = Campaign.builder()
				.id(UUID.randomUUID())
				.tenantId(createDto.getTenantId())
				.name(createDto.getName())
				.description(createDto.getDescription())
				.status(createDto.getStatus())
				.concurrencyStamp(UUID.randomUUID().toString())
				.creationTime(LocalDateTime.now())
				.isDeleted(false)
				.build();
		
		campaign = campaignRepository.save(campaign);
		return mapToResponseDto(campaign);
	}
	
	public CampaignDto getCampaignById(UUID id) {
		Campaign campaign = campaignRepository.findById(id)
				.filter(c -> !c.getIsDeleted())
				.orElseThrow(() -> new RuntimeException("Campaign not found or deleted"));
		return mapToResponseDto(campaign);
	}
	
	public List<CampaignDto> getCampaignsByTenantId(UUID tenantId) {
		return campaignRepository.findByTenantIdAndIsDeletedFalse(tenantId)
				.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());
	}
	
	public List<CampaignDto> getCampaignsByStatus(Integer status) {
		return campaignRepository.findByStatusAndIsDeletedFalse(status)
				.stream()
				.map(this::mapToResponseDto)
				.collect(Collectors.toList());
	}
	
	public CampaignDto updateCampaign(UUID id, CampaignDto updateDto) {
		Campaign campaign = campaignRepository.findById(id)
				.filter(c -> !c.getIsDeleted())
				.orElseThrow(() -> new RuntimeException("Campaign not found or deleted"));
		
		if (updateDto.getName() != null) campaign.setName(updateDto.getName());
		if (updateDto.getDescription() != null) campaign.setDescription(updateDto.getDescription());
		if (updateDto.getStatus() != null) campaign.setStatus(updateDto.getStatus());
		campaign.setLastModificationTime(LocalDateTime.now());
		campaign.setConcurrencyStamp(UUID.randomUUID().toString());
		
		campaign = campaignRepository.save(campaign);
		return mapToResponseDto(campaign);
	}
	
	public void deleteCampaign(UUID id) {
		Campaign campaign = campaignRepository.findById(id)
				.filter(c -> !c.getIsDeleted())
				.orElseThrow(() -> new RuntimeException("Campaign not found or deleted"));
		campaign.setIsDeleted(true);
		campaign.setDeletionTime(LocalDateTime.now());
		campaignRepository.save(campaign);
	}
	
	private CampaignDto mapToResponseDto(Campaign campaign) {
		return CampaignDto.builder()
				.id(campaign.getId())
				.tenantId(campaign.getTenantId())
				.name(campaign.getName())
				.description(campaign.getDescription())
				.status(campaign.getStatus())
				.extraProperties(campaign.getExtraProperties())
				.build();
	}
}
