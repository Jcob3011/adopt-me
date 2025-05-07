import {QueryOperator} from "../../../api/commons/search/QueryOperator";
import {SearchCriteria} from "../../../api/commons/search/SearchCriteria";


export const createSearchCriteria = (field: string, operator: QueryOperator, value?: string, values?: string[]): SearchCriteria => {
    return {
        field: field,
        operator: operator,
        value: value,
        values: values
    }
}
