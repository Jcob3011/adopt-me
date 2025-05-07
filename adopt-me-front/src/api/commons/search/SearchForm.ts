import {SearchSort} from "./SearchSort";
import {SearchCriteria} from "./SearchCriteria";

export interface SearchForm {
    criteria?: SearchCriteria[]
    sort?: SearchSort
    page: number
    size: number
}