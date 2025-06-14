package hust.advertisement.hustdatn.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class CampaignDto {
    private UUID id;
    private LocalDateTime creationTime;
    private LocalDateTime lastModificationTime;
    private UUID tenantId;
    private String name;
    private String description;
    private Integer status;
    private List<CampaignResourceDto> resources;
    private List<ScheduleDto> schedules;
}
