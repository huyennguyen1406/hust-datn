package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.exception.ApiStatusException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface EntitySpecification<T> {
    Specification<T> buildSpecification(List<FilterRequest> filters, String combination);

    default void addingCriteriaWithColumn(Root<T> root, CriteriaBuilder cb, List<Predicate> predicates, FilterRequest filter, String fieldName) {
        switch (filter.getOperation()) {
            case QueryConstant.EQUALS_OP ->
                    predicates.add(
                            cb.equal(
                                    cb.lower(root.get(fieldName)),
                                    filter.getValue().toLowerCase()
                            )
                    );

            case QueryConstant.CONTAINS_OP ->
                    predicates.add(
                            cb.like(
                                    cb.lower(root.get(fieldName)),
                                    "%" + filter.getValue().toLowerCase() + "%"
                            )
                    );

            default -> throw ApiStatusException.badRequest(
                    "Invalid operation in filter for Category",
                    "ERR_INVALID_FILTER_OPERATION"
            );
        }
    }
}
