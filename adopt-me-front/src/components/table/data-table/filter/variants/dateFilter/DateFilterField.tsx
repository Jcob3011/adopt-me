import {Dispatch, SetStateAction} from "react";
import {FormControl, FormHelperText, Stack} from "@mui/material";

import {SearchCriteria} from "../../../../../../api/commons/search/SearchCriteria";
import {QueryOperator} from "../../../../../../api/commons/search/QueryOperator";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {createSearchCriteria} from "../../../TableUtils";

type Props = {
    field: string
    label: string
    criteriaMap: Map<string, SearchCriteria | undefined>
    setCriteriaMap: Dispatch<SetStateAction<Map<string, SearchCriteria | undefined>>>
}

type InputFieldId = 'from' | 'to'

export const DateFilterField = ({field, label, criteriaMap, setCriteriaMap}: Props) => {
    const {t} = useTranslation()
    const theme = useTheme()
    const handleValueChange = (newValue: Dayjs | null, input: InputFieldId) => {
        if (newValue !== null) {
            if (input === 'from') {
                setCriteriaMap(new Map(criteriaMap.set(`${field}-${input}`, createSearchCriteria(field, QueryOperator.AFTER, newValue.toISOString()))))
            } else {
                setCriteriaMap(new Map(criteriaMap.set(`${field}-${input}`, createSearchCriteria(field, QueryOperator.BEFORE, newValue.toISOString()))))
            }
        } else {
            criteriaMap.delete(`${field}-${input}`)
            setCriteriaMap(new Map(criteriaMap))
        }
    }

    const getValue = (input: InputFieldId): Dayjs | null => {
        if (criteriaMap.get(`${field}-${input}`) !== undefined) {
            const criteria = criteriaMap.get(`${field}-${input}`)!;
            if (criteria.value !== undefined) {
                return dayjs(criteria.value)
            }
        }
        return null
    }

    return (
        <Stack direction='row' spacing={3}>
            <FormControl>
                <DatePicker
                    value={getValue('from') ? getValue('from') : null}
                    label={label}
                    slotProps={{
                        desktopPaper: {
                            sx: {
                                backgroundColor: theme.palette.textField.background
                            }
                        }
                    }}
                    onChange={value => handleValueChange(value, 'from')}/>
                <FormHelperText>
                    {t('components.table.filter.filterSideBar.from')}
                </FormHelperText>
            </FormControl>
            <FormControl>
                <DatePicker
                    value={getValue('to') ? getValue('to') : null}
                    label={label}
                    slotProps={{
                        desktopPaper: {
                            sx: {
                                backgroundColor: theme.palette.textField.background
                            }
                        }
                    }}
                    onChange={(value) => handleValueChange(value, 'to')}/>
                <FormHelperText>
                    {t('components.table.filter.filterSideBar.to')}
                </FormHelperText>
            </FormControl>
        </Stack>
    )
}