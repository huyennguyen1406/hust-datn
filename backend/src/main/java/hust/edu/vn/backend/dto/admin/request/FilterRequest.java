package hust.edu.vn.backend.dto.admin.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain=true)
public class FilterRequest {
    private String field;
    private String operation;
    private String value;
}
