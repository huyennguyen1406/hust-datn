package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface EntitySpecification<T> {
    Specification<T> buildSpecification(List<FilterRequest> filters, String combination);
}
