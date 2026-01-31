package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.entity.Province;
import hust.edu.vn.backend.exception.ApiStatusException;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProvinceSpecification implements EntitySpecification<Province> {
    private static final String PROVINCE_EN = "nameEn";
    private static final String PROVINCE_VI = "nameVi";


    @Override
    public Specification<Province> buildSpecification(List<FilterRequest> filters, String combination) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (FilterRequest filter : filters) {
                switch (filter.getField()) {
                    case PROVINCE_EN, PROVINCE_VI ->
                        addingCriteriaWithColumn(root, cb, predicates, filter, filter.getField());

                    default -> throw ApiStatusException.badRequest(
                            "Invalid field in filter for Province",
                            "ERR_INVALID_FILTER_FIELD"
                    );
                }
            }

            if (QueryConstant.COMBINATION_OR.equalsIgnoreCase(combination)) {
                return cb.or(predicates.toArray(new Predicate[0]));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }




}
