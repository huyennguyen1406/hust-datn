package hust.advertisement.hustdatn.controller;

import hust.advertisement.hustdatn.model.dto.CampaignDto;
import hust.advertisement.hustdatn.service.CampaignService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/campaign")
public class CampaignController {
	private final CampaignService campaignService;
	
	public CampaignController(CampaignService campaignService) {
		this.campaignService = campaignService;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CampaignDto> get(@PathVariable UUID id) {
		return ResponseEntity.ok(campaignService.getCampaignById(id));
	}
	
	@GetMapping
	public ResponseEntity<Page<CampaignDto>> getPagedList(@RequestParam int skipCount,
	                                                      @RequestParam int maxResultCount,
	                                                      @RequestParam(required = false) String sorting) {
		return ResponseEntity.ok(campaignService.getCampaignById(skipCount, maxResultCount, sorting));
	}
	
	@PostMapping
	public ResponseEntity<CampaignDto> create(@RequestBody CampaignDto input) {
		return ResponseEntity.ok(campaignService.create(input));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CampaignDto> update(@PathVariable UUID id,
	                                          @RequestBody CampaignDto input) {
		return ResponseEntity.ok(campaignService.update(id, input));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<CampaignDto> delete(@PathVariable UUID id) {
		return ResponseEntity.ok(campaignService.delete(id));
	}
	
	@PostMapping("/{id}/schedule")
	public ResponseEntity<CampaignDto> addSchedule(@PathVariable UUID id,
	                                               @RequestBody CampaignAddScheduleDto input) {
		return ResponseEntity.ok(campaignService.addSchedule(id, input));
	}
	
	@PostMapping("/schedule/{scheduleId}/approve")
	public ResponseEntity<Void> approveSchedule(@PathVariable UUID scheduleId) {
		campaignService.approveSchedule(scheduleId);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/schedule/{scheduleId}/refuse")
	public ResponseEntity<Void> refuseSchedule(@PathVariable UUID scheduleId) {
		campaignService.refuseSchedule(scheduleId);
		return ResponseEntity.ok().build();
	}
}
