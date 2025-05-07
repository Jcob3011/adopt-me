import {SearchForm} from "./SearchForm";
import {SearchResponse} from "./SearchResponse";

export interface SearchApi <T> {

    search(form: SearchForm): Promise<SearchResponse<T>>
}