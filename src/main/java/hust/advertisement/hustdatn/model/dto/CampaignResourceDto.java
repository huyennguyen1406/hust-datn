package hust.advertisement.hustdatn.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class CampaignResourceDto {
	private UUID id;
	private UUID tenantId;
	private String objectId;
	private String mimeType;
	private Integer displaySecond;
	private Integer order;
}
