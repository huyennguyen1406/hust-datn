package hust.advertisement.hustdatn.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ScheduleRequestDto {
	@NotNull(message = "Campaign ID is required")
	private UUID campaignId;
	
	@NotNull(message = "Billboard ID is required")
	private UUID billboardId;
	
	@NotNull(message = "Start time is required")
	private LocalDateTime startTime;
	
	@NotNull(message = "End time is required")
	private LocalDateTime endTime;
	
	@NotNull(message = "Display day is required")
	private Integer displayDay;
	
	@NotNull(message = "Campaign amount is required")
	private Integer campaignAmount;
	
	@NotNull(message = "Status is required")
	private Integer status;
}
