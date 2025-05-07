import {QueryOperator} from "./QueryOperator";

export interface SearchCriteria {
    field: string
    operator: QueryOperator
    value?: string
    values?: string[]
}