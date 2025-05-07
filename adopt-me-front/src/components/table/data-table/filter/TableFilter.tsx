import {TableFilterVariant} from "./TableFilterVariant";
import {DateFilterField} from "./variants/dateFilter/DateFilterField";
import {TextFilterField} from "./variants/textFilter/TextFilterField";
import {NumberFilterField} from "./variants/numberFIlter/NumberFilterField";
import {SelectFilterField, SelectOption} from "./variants/selectFilter/SelectFilterField";
import {Dispatch, SetStateAction} from "react";
import {SearchCriteria} from "../../../../api/commons/search/SearchCriteria";
import {TranslationKeyValue} from "../../../../providers/enum-translate-provider/EnumTranslateProvider";
import {QueryOperator} from "../../../../api/commons/search/QueryOperator";


type Props = {
    field: string
    label: string
    variant: TableFilterVariant
    selectOptionsPromise?: () => Promise<SelectOption[]>
    selectOptions?: SelectOption[]
    criteriaMap: Map<string, SearchCriteria | undefined>
    setCriteriaMap: Dispatch<SetStateAction<Map<string, SearchCriteria | undefined>>>
    enumTranslation?: TranslationKeyValue
    queryOperator?: QueryOperator
    options?: SelectOption[]
}

export const TableFilter = ({
                                field,
                                label,
                                variant,
                                options,
                                criteriaMap,
                                setCriteriaMap,
                                enumTranslation,
                                queryOperator
                            }: Props) => {
    switch (variant) {
        case TableFilterVariant.DATE:
            return <DateFilterField field={field} label={label} criteriaMap={criteriaMap}
                                    setCriteriaMap={setCriteriaMap}/>
        case TableFilterVariant.TEXT:
            return <TextFilterField field={field} label={label} criteriaMap={criteriaMap}
                                    setCriteriaMap={setCriteriaMap}/>
        case TableFilterVariant.NUMBER:
            return <NumberFilterField field={field} label={label} criteriaMap={criteriaMap}
                                      setCriteriaMap={setCriteriaMap}/>
        case TableFilterVariant.SELECT:
            return <SelectFilterField field={field} label={label} criteriaMap={criteriaMap}
                                      setCriteriaMap={setCriteriaMap} options={options ? options : []}
                                      enumTranslation={enumTranslation}
                                      queryOperator={queryOperator}/>
    }
}