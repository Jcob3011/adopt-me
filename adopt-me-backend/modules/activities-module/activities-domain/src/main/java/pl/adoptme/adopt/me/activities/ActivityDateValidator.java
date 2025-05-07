package pl.adoptme.adopt.me.activities;


import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.Duration;

public class ActivityDateValidator implements ConstraintValidator<ActivityDateConstraint, ActivityStatisticForm> {

    private Long maxDiffDays;
    private String fieldName;


    @Override
    public void initialize(ActivityDateConstraint constraint) {
        maxDiffDays = constraint.maxDiffDays();
        fieldName = constraint.fieldName();

    }

    @Override
    public boolean isValid(ActivityStatisticForm statisticForm, ConstraintValidatorContext context) {

        if (statisticForm.getCreatedOnTo() == null || statisticForm.getCreatedOnFrom() == null) return true;

        if (statisticForm.getCreatedOnTo().isBefore(statisticForm.getCreatedOnFrom())) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("day created on To must by before createdOnFrom")
                    .addPropertyNode(fieldName)
                    .addConstraintViolation();
            return false;
        }
        Duration diff = Duration.between(statisticForm.getCreatedOnFrom(), statisticForm.getCreatedOnTo());
        long diffDays = diff.toDays();


        if (diffDays > maxDiffDays) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Max diff must be less than " + maxDiffDays + " days")
                    .addPropertyNode(fieldName)
                    .addConstraintViolation();
            return false;
        }

        return true;
    }


}
