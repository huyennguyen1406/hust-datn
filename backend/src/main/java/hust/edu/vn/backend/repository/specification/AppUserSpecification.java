package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.entity.AppUser;
import hust.edu.vn.backend.entity.Role;
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

@SuppressWarnings("DuplicatedCode")
@Service
public class AppUserSpecification implements EntitySpecification<AppUser> {

    private static final String EMAIL = "email";
    private static final String PHONE_NUMBER = "phoneNumber";


    @Override
    public Specification<AppUser> buildSpecification(
            List<FilterRequest> filters,
            String combination
    ) {
        return (root, query, cb) -> {

            query.distinct(true);

            List<Predicate> mandatory = new ArrayList<>();

            Join<AppUser, Role> roleJoin = root.join("roles", JoinType.INNER);
            mandatory.add(
                    cb.equal(cb.lower(roleJoin.get("name")), "user")
            );

            List<Predicate> filtersPredicates = new ArrayList<>();
            for (FilterRequest filter : filters) {
                switch (filter.getField()) {
                    case EMAIL ->
                            addingCriteria(root, cb, filtersPredicates, filter, EMAIL);
                    case PHONE_NUMBER ->
                            addingCriteria(root, cb, filtersPredicates, filter, PHONE_NUMBER);
                    default ->
                            throw ApiStatusException.badRequest(
                                    "Invalid filter field for AppUser",
                                    "ERR_INVALID_FILTER_FIELD"
                            );
                }
            }

            Predicate filtersBlock;
            if (filtersPredicates.isEmpty()) {
                filtersBlock = cb.conjunction(); // TRUE
            } else if (QueryConstant.COMBINATION_OR.equalsIgnoreCase(combination)) {
                filtersBlock = cb.or(filtersPredicates.toArray(new Predicate[0]));
            } else {
                filtersBlock = cb.and(filtersPredicates.toArray(new Predicate[0]));
            }

            Predicate mandatoryBlock = cb.and(
                    mandatory.toArray(new Predicate[0])
            );


            return cb.and(mandatoryBlock, filtersBlock);
        };
    }


    private void addingCriteria(Root<AppUser> root, CriteriaBuilder cb, List<Predicate> predicates, FilterRequest filter, String fieldName) {
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
