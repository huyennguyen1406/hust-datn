package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.entity.Category;
import jakarta.persistence.criteria.Predicate;
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
                    addingCriteriaWithColumn(root, cb, predicates, filter, NAME_EN);
                }

                if (NAME_VI.equals(filter.getField())) {
                    addingCriteriaWithColumn(root, cb, predicates, filter, NAME_VI);
                }
            }

            if (QueryConstant.COMBINATION_OR.equalsIgnoreCase(combination)) {
                return cb.or(predicates.toArray(new Predicate[0]));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}
