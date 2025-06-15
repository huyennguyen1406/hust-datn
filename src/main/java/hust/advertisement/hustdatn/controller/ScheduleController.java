package hust.advertisement.hustdatn.controller;

import hust.advertisement.hustdatn.model.entities.Schedule;
import hust.advertisement.hustdatn.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {
	private final ScheduleService scheduleService;
	
	@GetMapping
	public List<Schedule> getAllSchedules() {
		return scheduleService.getAllSchedules();
	}
	
	@GetMapping("/{id}")
	public Schedule getScheduleById(@PathVariable UUID id) {
		return scheduleService.getScheduleById(id);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Schedule createSchedule(@RequestBody Schedule schedule) {
		return scheduleService.createSchedule(schedule);
	}
	
	@PutMapping("/{id}")
	public Schedule updateSchedule(@PathVariable UUID id, @RequestBody Schedule updates) {
		return scheduleService.updateSchedule(id, updates);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteSchedule(@PathVariable UUID id) {
		scheduleService.deleteSchedule(id);
	}
	
	@GetMapping("/billboard/{billboardId}")
	public List<Schedule> getSchedulesByBillboard(@PathVariable UUID billboardId) {
		return scheduleService.getSchedulesByBillboard(billboardId);
	}
	
	@GetMapping("/campaign/{campaignId}")
	public List<Schedule> getSchedulesByCampaign(@PathVariable UUID campaignId) {
		return scheduleService.getSchedulesByCampaign(campaignId);
	}
	
	@GetMapping("/date-range")
	public List<Schedule> getSchedulesBetweenDates(
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
		return scheduleService.getSchedulesBetweenDates(start, end);
	}
	
	@GetMapping("/billboard/{billboardId}/date-range")
	public List<Schedule> getBillboardSchedulesBetweenDates(
			@PathVariable UUID billboardId,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
		return scheduleService.getBillboardSchedulesBetweenDates(billboardId, start, end);
	}
}
