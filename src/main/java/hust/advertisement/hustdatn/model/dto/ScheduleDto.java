package hust.advertisement.hustdatn.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;
@Data
public class ScheduleDto {
	private UUID id;
	private UUID campaignId;
	private UUID billboardId;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private Integer displayDay;
	private Integer campaignAmount;
	private Integer status;
}
