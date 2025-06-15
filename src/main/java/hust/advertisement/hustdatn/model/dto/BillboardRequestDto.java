package hust.advertisement.hustdatn.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class BillboardRequestDto {
	@NotBlank(message = "Name is required")
	private String name;
	
	private String description;
	private String code;
	
	@NotNull(message = "Type is required")
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
	
	@NotNull(message = "Status is required")
	private Integer status;
	
	private Boolean isLinked;
	private UUID linkedUserId;
	private Boolean isConnected;
	private String phone;
	private String email;
}
