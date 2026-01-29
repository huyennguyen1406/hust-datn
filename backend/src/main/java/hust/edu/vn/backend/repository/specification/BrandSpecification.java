package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.entity.Brand;
import hust.edu.vn.backend.exception.ApiStatusException;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandSpecification {

    private static final String BRAND_NAME = "brandName";

    public Specification<Brand> buildSpecification(List<FilterRequest> filters, String combination) {

        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (FilterRequest filter : filters) {
                if (BRAND_NAME.equals(filter.getField())) {
                    switch (filter.getOperation()) {
                        case QueryConstant.EQUALS_OP ->
                                predicates.add(
                                        cb.equal(
                                                cb.lower(root.get(BRAND_NAME)),
                                                filter.getValue().toLowerCase()
                                        )
                                );

                        case QueryConstant.CONTAINS_OP ->
                                predicates.add(
                                        cb.like(
                                                cb.lower(root.get(BRAND_NAME)),
                                                "%" + filter.getValue().toLowerCase() + "%"
                                        )
                                );
                        default -> throw ApiStatusException.badRequest("Invalid operation in filter for Brand", "ERR_INVALID_FILTER_OPERATION");
                    }
                }
            }

            if (QueryConstant.COMBINATION_OR.equalsIgnoreCase(combination)) {
                return cb.or(predicates.toArray(new Predicate[0]));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}
