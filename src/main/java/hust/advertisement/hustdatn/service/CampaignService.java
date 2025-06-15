package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.dto.CampaignDto;
import hust.advertisement.hustdatn.model.dto.CampaignRequestDto;
import hust.advertisement.hustdatn.model.dto.CampaignResourceDto;
import hust.advertisement.hustdatn.model.entities.Campaign;
import hust.advertisement.hustdatn.model.entities.CampaignResource;
import hust.advertisement.hustdatn.repository.CampaignRepository;
import hust.advertisement.hustdatn.repository.CampaignResourceRepository;
import hust.advertisement.hustdatn.repository.ScheduleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CampaignService {
	private final CampaignRepository campaignRepository;
	private final CampaignResourceRepository resourceRepository;
	private final ScheduleRepository scheduleRepository;
	
	public List<Campaign> getAllCampaigns() {
		return campaignRepository.findAll();
	}
	
	public Campaign getCampaignById(UUID id) {
		return campaignRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found"));
	}
	
	public Campaign createCampaign(Campaign campaign) {
		if (campaign.getResources() != null) {
			campaign.getResources().forEach(res -> res.setCampaign(campaign));
		}
		return campaignRepository.save(campaign);
	}
	
	public Campaign updateCampaign(UUID id, Campaign updates) {
		Campaign existing = campaignRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found"));
		
		if (updates.getName() != null) existing.setName(updates.getName());
		if (updates.getDescription() != null) existing.setDescription(updates.getDescription());
		if (updates.getStatus() != null) existing.setStatus(updates.getStatus());
		
		if (updates.getResources() != null) {
			existing.getResources().clear();
			updates.getResources().forEach(res -> {
				res.setCampaign(existing);
				existing.getResources().add(res);
			});
		}
		
		return campaignRepository.save(existing);
	}
	
	public void deleteCampaign(UUID id) {
		if (!campaignRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campaign not found");
		}
		campaignRepository.deleteById(id);
	}
}
