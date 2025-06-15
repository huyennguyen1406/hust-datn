package hust.advertisement.hustdatn.service;

import hust.advertisement.hustdatn.model.dto.ScheduleDto;
import hust.advertisement.hustdatn.model.dto.ScheduleRequestDto;
import hust.advertisement.hustdatn.model.entities.Schedule;
import hust.advertisement.hustdatn.repository.BillboardRepository;
import hust.advertisement.hustdatn.repository.CampaignRepository;
import hust.advertisement.hustdatn.repository.ScheduleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {
	private final ScheduleRepository scheduleRepository;
	private final BillboardRepository billboardRepository;
	private final CampaignRepository campaignRepository;
	
	public List<Schedule> getAllSchedules() {
		return scheduleRepository.findAll();
	}
	
	public Schedule getScheduleById(UUID id) {
		return scheduleRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found"));
	}
	
	public Schedule createSchedule(Schedule schedule) {
		// Verify billboard and campaign exist
		if (!billboardRepository.existsById(schedule.getBillboard().getId())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Billboard not found");
		}
		if (!campaignRepository.existsById(schedule.getCampaign().getId())) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Campaign not found");
		}
		return scheduleRepository.save(schedule);
	}
	
	public Schedule updateSchedule(UUID id, Schedule updates) {
		Schedule existing = scheduleRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found"));
		
		if (updates.getStartTime() != null) existing.setStartTime(updates.getStartTime());
		if (updates.getEndTime() != null) existing.setEndTime(updates.getEndTime());
		if (updates.getDisplayDay() != null) existing.setDisplayDay(updates.getDisplayDay());
		if (updates.getCampaignAmount() != null) existing.setCampaignAmount(updates.getCampaignAmount());
		if (updates.getStatus() != null) existing.setStatus(updates.getStatus());
		
		return scheduleRepository.save(existing);
	}
	
	public void deleteSchedule(UUID id) {
		if (!scheduleRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found");
		}
		scheduleRepository.deleteById(id);
	}
	
	public List<Schedule> getSchedulesByBillboard(UUID billboardId) {
		return scheduleRepository.findByBillboardId(billboardId);
	}
	
	public List<Schedule> getSchedulesByCampaign(UUID campaignId) {
		return scheduleRepository.findByCampaignId(campaignId);
	}
	
	public List<Schedule> getSchedulesBetweenDates(LocalDateTime start, LocalDateTime end) {
		return scheduleRepository.findByStartTimeBetween(start, end);
	}
	
	public List<Schedule> getBillboardSchedulesBetweenDates(UUID billboardId, LocalDateTime start, LocalDateTime end) {
		return scheduleRepository.findByBillboardIdAndStartTimeBetween(billboardId, start, end);
	}
}
