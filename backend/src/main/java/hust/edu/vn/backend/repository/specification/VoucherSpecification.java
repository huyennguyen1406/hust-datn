package hust.edu.vn.backend.repository.specification;

import hust.edu.vn.backend.constant.ErrorConstant;
import hust.edu.vn.backend.constant.QueryConstant;
import hust.edu.vn.backend.dto.admin.request.FilterRequest;
import hust.edu.vn.backend.entity.Voucher;
import hust.edu.vn.backend.exception.ApiStatusException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class VoucherSpecification implements EntitySpecification<Voucher> {
    private static final String CODE = "code";
    private static final String START_TIME = "startTime";
    private static final String END_TIME = "endTime";
    private static final String DISCOUNT_AMOUNT = "discountAmount";

    private static final String DATE_REGEX =
            "^(0[1-9]|[12]\\d|3[01])/(0[1-9]|1[0-2])/\\d{4}$";

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");


    @Override
    public Specification<Voucher> buildSpecification(List<FilterRequest> filters, String combination) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (FilterRequest filter : filters) {

                switch (filter.getField()) {
                    case CODE -> codeCriterial(root, cb, predicates, filter);
                    case START_TIME -> timeCriterial(root, cb, predicates, filter, START_TIME);
                    case END_TIME -> timeCriterial(root, cb, predicates, filter, END_TIME);
                    case DISCOUNT_AMOUNT ->  discountCriterial(root, cb, predicates, filter);
                    default -> throw ApiStatusException.badRequest(
                            "Invalid filter field for Voucher",
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

    private void codeCriterial(Root<Voucher> root, CriteriaBuilder cb, List<Predicate> predicates, FilterRequest filter) {
        switch (filter.getOperation()) {
            case QueryConstant.EQUALS_OP ->
                    predicates.add(
                            cb.equal(
                                    cb.lower(root.get(CODE)),
                                    filter.getValue().toLowerCase()
                            )
                    );

            case QueryConstant.CONTAINS_OP ->
                    predicates.add(
                            cb.like(
                                    cb.lower(root.get(CODE)),
                                    "%" + filter.getValue().toLowerCase() + "%"
                            )
                    );

            default -> throw ApiStatusException.badRequest(
                    ErrorConstant.ERROR_MESSAGE_INVALID_FILTER_OPERATION,
                    ErrorConstant.ERROR_CODE_INVALID_FILTER_OPERATION
            );
        }
    }

    private void timeCriterial(Root<Voucher> root, CriteriaBuilder cb,
                               List<Predicate> predicates, FilterRequest filter, String field) {
        String value = filter.getValue();

        if (value == null || !value.matches(DATE_REGEX)) {
            throw ApiStatusException.badRequest(
                    "Invalid date format, expected dd/MM/yyyy",
                    "ERR_INVALID_DATE_FORMAT"
            );
        }

        LocalDate date;

        try {
            date = LocalDate.parse(value, formatter);
        } catch (Exception e) {
            throw ApiStatusException.badRequest(
                    "Invalid date value, expected dd/MM/yyyy",
                    "ERR_INVALID_DATE_VALUE"
            );
        }

        Instant instant;
        switch (filter.getOperation()) {
            case QueryConstant.GREATER_THAN_OR_EQUALS_OP -> {
                instant = date
                        .atStartOfDay(ZoneId.systemDefault())
                        .toInstant();

                predicates.add(
                        cb.greaterThanOrEqualTo(
                                root.get(field),
                                instant
                        )
                );
            }

            case QueryConstant.LESS_THAN_OR_EQUALS_OP -> {
                instant = date
                        .plusDays(1)
                        .atStartOfDay(ZoneId.systemDefault())
                        .toInstant();

                predicates.add(
                        cb.lessThan(
                                root.get(field),
                                instant
                        )
                );
            }

            default -> throw ApiStatusException.badRequest(
                    ErrorConstant.ERROR_MESSAGE_INVALID_FILTER_OPERATION,
                    ErrorConstant.ERROR_CODE_INVALID_FILTER_OPERATION
            );
        }
    }

    private void discountCriterial(Root<Voucher> root, CriteriaBuilder cb,
                                   List<Predicate> predicates, FilterRequest filter) {
        Integer value;

        try {
            value = Integer.valueOf(filter.getValue());
        } catch (NumberFormatException e) {
            throw ApiStatusException.badRequest(
                    "Invalid discountAmount value",
                    "ERR_INVALID_NUMBER"
            );
        }

        switch (filter.getOperation()) {
            case QueryConstant.EQUALS_OP ->
                    predicates.add(
                            cb.equal(
                                    root.get(DISCOUNT_AMOUNT),
                                    value
                            )
                    );

            case QueryConstant.GREATER_THAN_OR_EQUALS_OP ->
                    predicates.add(
                            cb.greaterThanOrEqualTo(
                                    root.get(DISCOUNT_AMOUNT),
                                    value
                            )
                    );

            case QueryConstant.LESS_THAN_OR_EQUALS_OP ->
                    predicates.add(
                            cb.lessThanOrEqualTo(
                                    root.get(DISCOUNT_AMOUNT),
                                    value
                            )
                    );

            default -> throw ApiStatusException.badRequest(
                    ErrorConstant.ERROR_MESSAGE_INVALID_FILTER_OPERATION,
                    ErrorConstant.ERROR_CODE_INVALID_FILTER_OPERATION
            );
        }

    }
}
