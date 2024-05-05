package pl.adoptme.adoptme.adoptme.common.infrastructure;


import jakarta.persistence.criteria.Expression;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;
import pl.adoptme.adoptme.common.domain.search.Caster;
import pl.adoptme.adoptme.common.domain.search.QueryOperator;
import pl.adoptme.adoptme.common.domain.search.SearchCriteria;
import pl.adoptme.adoptme.common.domain.search.SearchForm;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.data.jpa.domain.Specification.where;
import static pl.adoptme.adoptme.adoptme.common.infrastructure.SearchUtils.validateCriteria;
import static pl.adoptme.adoptme.common.domain.search.Caster.castToRequiredType;

@AllArgsConstructor
public class SearchSpecification {

    public static <T> Specification<T> createSpecification(SearchCriteria criteria) {
        switch (QueryOperator.valueOf(criteria.getOperator())) {
            case IN -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.in(root.get(criteria.getField()))
                                .value(Caster.castToRequiredTypes(
                                        root.get(criteria.getField()).getJavaType(),
                                        criteria.getValues()));
            }
            case NOT_IN -> {
                return (root, query, criteriaBuilder) -> {
                    Expression<?> fieldExpression = root.get(criteria.getField());
                    return criteriaBuilder.not(fieldExpression.in(criteria.getValues()));
                };
            }
            case CONTAINS -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.isMember(castToRequiredType(
                                        root.get(criteria.getField()).getJavaType(),
                                        criteria.getValue()),
                                root.get(criteria.getField()));
            }
            case LIKE -> {
                return (root, query, criteriaBuilder) -> criteriaBuilder.like(
                        criteriaBuilder.lower(root.get(criteria.getField())),
                        "%" + criteria.getValue().toLowerCase() + "%"
                );
            }
            case EQUALS -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.equal(root.get(criteria.getField()),
                                castToRequiredType(root.get(criteria.getField()).getJavaType(),
                                        criteria.getValue()));
            }
            case LESS_THAN -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.lt(root.get(criteria.getField()),
                                (Number) castToRequiredType(
                                        root.get(criteria.getField()).getJavaType(),
                                        criteria.getValue()));
            }
            case NOT_EQUALS -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.notEqual(root.get(criteria.getField()),
                                castToRequiredType(root.get(criteria.getField()).getJavaType(),
                                        criteria.getValue()));
            }
            case GREATER_THAN -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.gt(root.get(criteria.getField()),
                                (Number) castToRequiredType(
                                        root.get(criteria.getField()).getJavaType(),
                                        criteria.getValue()));
            }
            case BEFORE -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.lessThan(root.get(criteria.getField()),
                                (LocalDateTime) castToRequiredType(
                                        root.get(criteria.getField()).getJavaType(),
                                        criteria.getValue()));
            }
            case AFTER -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.greaterThan(root.get(criteria.getField()),
                                (LocalDateTime) castToRequiredType(
                                        root.get(criteria.getField()).getJavaType(),
                                        criteria.getValue()));
            }
            case IS_NULL -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.isNull(root.get(criteria.getField()));
            }
            case IS_NOT_NULL -> {
                return (root, query, criteriaBuilder) ->
                        criteriaBuilder.isNotNull(root.get(criteria.getField()));
            }
            default -> throw new ApplicationException(ErrorCode.UNSUPPORTED_OPERATION_TYPE);
        }
    }

    public static <T> Specification<T> getSpecificationFromCriteria(SearchForm searchForm, List<String> filterList) {
        if (searchForm.getCriteria() != null && !searchForm.getCriteria().isEmpty()) {
            validateCriteria(searchForm.getCriteria(), filterList);

            Specification<T> specification = where(createSpecification(searchForm.getCriteria().get(0)));
            searchForm.getCriteria().remove(0);
            for (SearchCriteria input : searchForm.getCriteria()) {
                specification = specification.and(createSpecification(input));
            }
            return specification;
        }
        return null;
    }
}
