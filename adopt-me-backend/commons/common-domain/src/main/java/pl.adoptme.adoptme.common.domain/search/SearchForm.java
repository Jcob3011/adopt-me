package pl.adoptme.adoptme.common.domain.search;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchForm {
    private List<@Valid SearchCriteria> criteria;
    @Valid
    private SearchSort sort;
    @NotNull
    private Integer page;
    @NotNull
    private Integer size;
}
