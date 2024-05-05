package pl.adoptme.adoptme.adoptme.common.infrastructure;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import pl.adoptme.adoptme.common.domain.ApplicationException;
import pl.adoptme.adoptme.common.domain.ErrorCode;
import pl.adoptme.adoptme.common.domain.search.SearchCriteria;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;
import pl.adoptme.adoptme.common.domain.search.SearchSort;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static pl.adoptme.adoptme.adoptme.common.infrastructure.SearchSpecification.getSpecificationFromCriteria;

public class SearchUtils {
    public static Pageable getPageable(SearchForm searchForm) {
        SearchSort searchSort = searchForm.getSort();
        if(searchSort == null) {
            return PageRequest
                    .of(searchForm.getPage(), searchForm.getSize());
        }
        return PageRequest
                .of(searchForm.getPage(), searchForm.getSize())
                .withSort(Sort.Direction.valueOf(searchSort.getDirection().toUpperCase()), searchSort.getBy());
    }

    public static void validateCriteria(List<SearchCriteria> searchCriteriaList, List<String> filterList) {
        if(searchCriteriaList != null) {
            for(SearchCriteria criteria : searchCriteriaList) {
                if(!filterList.contains(criteria.getField())) {
                    throw new ApplicationException(ErrorCode.WRONG_SEARCH_CRITERIA_FIELD, "Search field has to be one of: " + filterList);
                }
            }
        }
    }

    public static <T, R> SearchResponse<R> createSearchResponse(JpaSpecificationExecutor<T> executor,
                                                                SearchForm searchForm,
                                                                List<String> filterList,
                                                                Function<T, R> entityToDomain) {

        Page<T> page = executor.findAll((getSpecificationFromCriteria(searchForm, filterList)), getPageable(searchForm));
        List<R> items = page.stream().map(entityToDomain).collect(Collectors.toList());

        return new SearchResponse<>(items,
                page.getTotalElements(),
                searchForm.getSort(),
                page.getNumber(),
                page.getSize(),
                page.isLast());
    }
}