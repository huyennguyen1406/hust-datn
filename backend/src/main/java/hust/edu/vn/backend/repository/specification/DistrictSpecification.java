package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.entity.District;
import hust.edu.vn.backend.entity.Province;
import hust.edu.vn.backend.exception.ApiStatusException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DistrictSpecification implements EntitySpecification<District>{
    private static final String DISTRICT_EN = "nameEn";
    private static final String DISTRICT_VI = "nameVi";
    private static final String PROVINCE_REQUEST_EN = "provinceNameEn";
    private static final String PROVINCE_REQUEST_VI = "provinceNameVi";
    private static final String PROVINCE_EN = "nameEn";
    private static final String PROVINCE_VI = "nameVi";

    @Override
    public Specification<District> buildSpecification(List<FilterRequest> filters, String combination) {
        return (root, query, cb) -> {
            if (District.class.equals(query.getResultType())) {
                root.fetch("province", JoinType.LEFT);
                query.distinct(true);
            }

            List<Predicate> predicates = new ArrayList<>();

            for (FilterRequest filter : filters) {
                switch (filter.getField()) {
                    case DISTRICT_EN, DISTRICT_VI ->
                            addingCriteriaWithColumn(root, cb, predicates, filter, filter.getField());
                    case PROVINCE_REQUEST_EN ->
                            addingProvinceCriteria(root, cb, predicates, filter, PROVINCE_EN);
                    case PROVINCE_REQUEST_VI ->
                            addingProvinceCriteria(root, cb, predicates, filter, PROVINCE_VI);
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

    @SuppressWarnings("DuplicatedCode")
    private void addingProvinceCriteria(
            Root<District> root,
            CriteriaBuilder cb,
            List<Predicate> predicates,
            FilterRequest filter,
            String provinceField
    ) {
        Join<District, Province> provinceJoin = root.join("province");

        switch (filter.getOperation()) {
            case QueryConstant.EQUALS_OP ->
                    predicates.add(
                            cb.equal(
                                    cb.lower(provinceJoin.get(provinceField)),
                                    filter.getValue().toLowerCase()
                            )
                    );

            case QueryConstant.CONTAINS_OP ->
                    predicates.add(
                            cb.like(
                                    cb.lower(provinceJoin.get(provinceField)),
                                    "%" + filter.getValue().toLowerCase() + "%"
                            )
                    );

            default -> {
                // Do nothing for invalid operation
            }
        }
    }

}
