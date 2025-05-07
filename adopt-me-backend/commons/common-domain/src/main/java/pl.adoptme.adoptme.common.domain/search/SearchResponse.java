package pl.adoptme.adoptme.common.domain.search;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;


@Getter
@Setter
@Builder
@AllArgsConstructor
public class SearchResponse<T> {
    private List<T> items;
    private Long total;
    private SearchSort sort;
    private int page;
    private int size;
    private boolean lastPage;

    public <R> SearchResponse<R> map(Function<T, R> mapper) {
        return new SearchResponse<>(items.stream().map(mapper).collect(Collectors.toList()),
                this.total,
                this.sort,
                this.page,
                this.size,
                this.lastPage);
    }
}
