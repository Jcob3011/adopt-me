package pl.adoptme.adoptme.common.domain.search;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import pl.adoptme.adoptme.common.domain.validation.Conditional;
import pl.adoptme.adoptme.common.domain.validation.EnumValidation;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
//@Conditional(selected = "operator", values = {"IN"}, required = "values")
@Conditional(selected = "operator", values = {"LIKE", "CONTAINS", "GREATER_THAN", "LESS_THAN", "EQUALS", "NOT_EQUALS", "BEFORE", "AFTER"}, required = "value")
public class SearchCriteria {
    @NotBlank
    private String field;
    @NotBlank
    @EnumValidation(enumClass = QueryOperator.class, message = "{validation.invalid}")
    private String operator;
    private String value;
    private List<String> values;
}
