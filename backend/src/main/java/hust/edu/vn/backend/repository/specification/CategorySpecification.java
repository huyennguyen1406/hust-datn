package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.entity.Category;
import hust.edu.vn.backend.exception.ApiStatusException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategorySpecification implements EntitySpecification<Category> {
    private static final String NAME_EN = "nameEn";
    private static final String NAME_VI = "nameVi";

    @Override
    public Specification<Category> buildSpecification(List<FilterRequest> filters, String combination) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (FilterRequest filter : filters) {

                if (NAME_EN.equals(filter.getField())) {
                    addingCriteria(root, cb, predicates, filter, NAME_EN);
                }

                if (NAME_VI.equals(filter.getField())) {
                    addingCriteria(root, cb, predicates, filter, NAME_VI);
                }
            }

            if (QueryConstant.COMBINATION_OR.equalsIgnoreCase(combination)) {
                return cb.or(predicates.toArray(new Predicate[0]));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private void addingCriteria(Root<Category> root, CriteriaBuilder cb, List<Predicate> predicates, FilterRequest filter, String fieldName) {
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
