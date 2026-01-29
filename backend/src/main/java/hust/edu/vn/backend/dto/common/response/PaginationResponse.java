package hust.edu.vn.backend.dto.common.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class PaginationResponse<T> {
    private List<T> data;
    private Integer page;
    private Integer pageSize;
    private Integer totalPages;
    private Long totalItems;
}
