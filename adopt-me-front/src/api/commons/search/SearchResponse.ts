import {SearchSort} from "./SearchSort";

export interface SearchResponse <T> {
    items: T[]
    total: number
    sort?: SearchSort
    page: number
    size: number
    lastPage: boolean
}