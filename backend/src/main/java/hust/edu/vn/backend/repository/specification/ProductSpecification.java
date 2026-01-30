package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.entity.Brand;
import hust.edu.vn.backend.entity.Product;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@SuppressWarnings("DuplicatedCode")
@Service
public class ProductSpecification implements EntitySpecification<Product>{
    private static final String PRODUCT_EN = "nameEn";
    private static final String PRODUCT_VI = "nameVi";
    private static final String BRAND_NAME = "brandName";

    @Override
    public Specification<Product> buildSpecification(List<FilterRequest> filters, String combination) {
        return (root, query, cb) -> {
            query.distinct(true);

            List<Predicate> predicates = new ArrayList<>();

            for (FilterRequest filter : filters) {

                switch (filter.getField()) {

                    case PRODUCT_EN ->
                            addingProductNameCriteria(root, cb, predicates, filter, PRODUCT_EN);

                    case PRODUCT_VI ->
                            addingProductNameCriteria(root, cb, predicates, filter, PRODUCT_VI);


                    case BRAND_NAME ->
                            addingBrandCriteria(root, cb, predicates, filter, BRAND_NAME);

                    default -> {
                        // Do nothing for invalid field
                    }
                }
            }

            if (QueryConstant.COMBINATION_OR.equalsIgnoreCase(combination)) {
                return cb.or(predicates.toArray(new Predicate[0]));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private void addingProductNameCriteria(Root<Product> root, CriteriaBuilder cb, List<Predicate> predicates, FilterRequest filter, String fieldName) {
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
            default -> {
                // Do nothing for invalid operation
            }
        }
    }


    private void addingBrandCriteria(Root<Product> root, CriteriaBuilder cb, List<Predicate> predicates, FilterRequest filter, String brandField) {
        Join<Product, Brand> brandJoin = root.join("brand");

        switch (filter.getOperation()) {
            case QueryConstant.EQUALS_OP ->
                    predicates.add(
                            cb.equal(
                                    cb.lower(brandJoin.get(brandField)),
                                    filter.getValue().toLowerCase()
                            )
                    );

            case QueryConstant.CONTAINS_OP ->
                    predicates.add(
                            cb.like(
                                    cb.lower(brandJoin.get(brandField)),
                                    "%" + filter.getValue().toLowerCase() + "%"
                            )
                    );
            default -> {
                // Do nothing for invalid operation
            }
        }
    }

}
