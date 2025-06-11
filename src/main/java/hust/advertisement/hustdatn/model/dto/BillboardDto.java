package hust.advertisement.hustdatn.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
@Data
public class BillboardDto {
	private UUID id;
	private UUID tenantId;
	private String name;
	private String description;
	private String code;
	private Integer type;
	private Integer dimensionWidth;
	private Integer dimensionHeight;
	private Integer dimensionInches;
	private String addressProvince;
	private String addressDistrict;
	private String addressWard;
	private String addressType;
	private String addressDescription;
	private Integer addressCategory;
	private Integer status;
	private Boolean isLinked;
	private UUID linkedUserId;
	private Boolean isConnected;
	private String phone;
	private String email;
	private List<BillboardResourceDto> resources;
	private List<BillboardTagDto> tags;
	private LocalDateTime creationTime;
	private UUID creatorId;
	private LocalDateTime lastModificationTime;
	private UUID lastModifierId;
}
