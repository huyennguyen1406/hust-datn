package hust.advertisement.hustdatn.model.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CampaignRequestDto {
	@NotBlank(message = "Name is required")
	private String name;
	
	private String description;
	
	@NotNull(message = "Status is required")
	private Integer status;
}
