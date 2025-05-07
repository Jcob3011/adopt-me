package pl.adoptme.adoptme.common.domain.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class EnumValidationConstraint implements ConstraintValidator<EnumValidation, String> {

    private Set<String> values;

    @Override
    public void initialize(EnumValidation annotation) {
        values = Stream.of(annotation.enumClass().getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isValid(String enumValue, ConstraintValidatorContext constraintValidatorContext) {
        if(enumValue == null || enumValue.trim().isEmpty()) {
            return true;
        }
        return values.contains(enumValue.toUpperCase());
    }
}