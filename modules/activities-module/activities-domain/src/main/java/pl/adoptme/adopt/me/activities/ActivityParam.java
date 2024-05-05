package pl.adoptme.adopt.me.activities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class ActivityParam {
    String id;

    String name;

    String value;
}

