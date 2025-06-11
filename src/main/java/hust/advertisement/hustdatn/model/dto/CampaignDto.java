package hust.advertisement.hustdatn.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CampaignDto {
	private UUID id;
	private UUID tenantId;
	private String name;
	private String description;
	private Integer status;
	private List<CampaignResourceDto> resources;
	private List<ScheduleDto> schedules;
	private LocalDateTime creationTime;
	private UUID creatorId;
	private LocalDateTime lastModificationTime;
	private UUID lastModifierId;
}
