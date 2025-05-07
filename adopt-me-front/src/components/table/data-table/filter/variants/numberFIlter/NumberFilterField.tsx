import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {FormControl, FormHelperText, Stack, TextField} from "@mui/material";
import {createSearchCriteria} from "../../../TableUtils";
import {QueryOperator} from "../../../../../../api/commons/search/QueryOperator";
import {SearchCriteria} from "../../../../../../api/commons/search/SearchCriteria";
import classes from "./NumberFilterField.module.css"
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";

type InputFieldId = 'from' | 'to'

type Props = {
    field: string
    label: string
    criteriaMap: Map<string, SearchCriteria | undefined>
    setCriteriaMap: Dispatch<SetStateAction<Map<string, SearchCriteria | undefined>>>
}
export const NumberFilterField = ({field, label, criteriaMap, setCriteriaMap}: Props) => {
    const {t} = useTranslation()
    const theme = useTheme()
    const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, input: InputFieldId) => {
        const value = event.target.value
        if (value !== '') {
            if (input === 'from') {
                setCriteriaMap(new Map(criteriaMap.set(`${field}-${input}`, createSearchCriteria(field, QueryOperator.GREATER_THAN, value))))
            } else {
                setCriteriaMap(new Map(criteriaMap.set(`${field}-${input}`, createSearchCriteria(field, QueryOperator.LESS_THAN, value))))
            }
        } else {
            criteriaMap.delete(`${field}-${input}`)
            setCriteriaMap(new Map(criteriaMap))
        }
    }

    const getValue = (input: InputFieldId): string => {
        if (criteriaMap.get(`${field}-${input}`) !== undefined) {
            const criteria = criteriaMap.get(`${field}-${input}`)!;
            if (criteria.value !== undefined) {
                return criteria.value;
            }
        }
        return ''
    }

    return (
        <Stack direction='row' spacing={3}>
            <FormControl>
                <TextField
                    type='number'
                    label={label}
                    InputProps={{
                        style: {
                            color: theme.palette.text.primary
                        }
                    }}
                    FormHelperTextProps={{
                        style: {
                            color: theme.palette.text.primary
                        }
                    }}
                    sx={{
                        "& input": {
                            backgroundColor: theme.palette.textField.background
                        }
                    }}
                    value={getValue('from')}
                    onChange={event => handleValueChange(event, 'from')}/>
                <FormHelperText>
                    {t('components.table.filter.filterSideBar.to')}
                </FormHelperText>
            </FormControl>
            <FormControl>
                <TextField
                    type='number'
                    label={label}
                    InputProps={{
                        style: {
                            color: theme.palette.text.primary
                        }
                    }}
                    FormHelperTextProps={{
                        style: {
                            color: theme.palette.text.primary
                        }
                    }}
                    sx={{
                        "& input": {
                            backgroundColor: theme.palette.textField.background
                        }
                    }}
                    className={classes.textField}
                    value={getValue('to')}
                    onChange={event => handleValueChange(event, 'to')}/>
                <FormHelperText>
                    {t('components.table.filter.filterSideBar.to')}
                </FormHelperText>
            </FormControl>
        </Stack>
    )
}