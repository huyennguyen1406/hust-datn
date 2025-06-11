package hust.advertisement.hustdatn.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class BillboardResourceDto {
	private UUID id;
	private UUID tenantId;
	private String objectId;
	private String mimeType;
	private Integer order;
}
