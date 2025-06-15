package hust.advertisement.hustdatn.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class BillboardTagDto {
    private UUID id;
    
    @NotBlank(message = "Tag is required")
    private String tag;
}
