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
	List<Schedule> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
	List<Schedule> findByBillboardIdAndStartTimeBetween(UUID billboardId, LocalDateTime start, LocalDateTime end);
}
