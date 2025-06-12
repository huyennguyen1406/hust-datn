package hust.advertisement.hustdatn.repository;

import hust.advertisement.hustdatn.model.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, UUID> {
	
	List<Schedule> findByBillboardId(UUID billboardId);
	
	List<Schedule> findByCampaignId(UUID campaignId);
	
	List<Schedule> findByStartTimeBetweenAndBillboardId(
			LocalDateTime start, LocalDateTime end, UUID billboardId);
	
	List<Schedule> findByStartTimeBetweenAndCampaignId(
			LocalDateTime start, LocalDateTime end, UUID campaignId);
}
