package pl.adoptme.adopt.me.activities;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Builder
@ActivityDateConstraint(fieldName = "createdOnFrom", maxDiffDays = 730, message = "Invalid date")
public class ActivityStatisticForm {

    @NotNull(message = "Type cannot be null")
    private Set<ActivityType> type;
    @NotNull(message = "createdOnFrom cannot be null")
    private LocalDateTime createdOnFrom;
    @NotNull(message = "createdOnTo cannot be null")
    private LocalDateTime createdOnTo;

}

