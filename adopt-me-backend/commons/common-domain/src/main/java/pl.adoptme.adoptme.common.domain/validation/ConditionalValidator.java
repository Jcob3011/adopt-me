package pl.adoptme.adoptme.common.domain.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.apache.commons.beanutils.BeanUtils;

import java.util.Arrays;

import static org.springframework.util.ObjectUtils.isEmpty;

class ConditionalValidator implements ConstraintValidator<Conditional, Object> {

    private String selected;
    private String[] required;
    private String message;
    private String[] values;

    @Override
    public void initialize(Conditional conditional) {
        selected = conditional.selected();
        required = conditional.required();
        message = conditional.message();
        values = conditional.values();
    }

    @Override
    public boolean isValid(Object objectToValidate, ConstraintValidatorContext context) {
        boolean valid = true;
        try {
            Object actualValue = BeanUtils.getProperty(objectToValidate, selected);
            if (Arrays.asList(values).contains(actualValue)) {
                for (String propName : required) {
                    Object requiredValue = BeanUtils.getProperty(objectToValidate, propName);
                    valid = (requiredValue != null && !isEmpty(requiredValue));
                    if (!valid) {
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate(message).addPropertyNode(propName).addConstraintViolation();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return valid;
    }
}
