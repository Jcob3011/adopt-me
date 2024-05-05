package pl.adoptme.adopt.me.activities;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ActivityStatistic {
    private ActivityType type;
    private long count;
}

