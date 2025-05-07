import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {createSearchCriteria} from "../../../TableUtils";
import {QueryOperator} from "../../../../../../api/commons/search/QueryOperator";
import {SearchCriteria} from "../../../../../../api/commons/search/SearchCriteria";
import classes from "./SelectFIlterField.module.css"
import Box from "@mui/material/Box";
import {
    EnumTranslateContext,
    TranslationKeyValue
} from "../../../../../../providers/enum-translate-provider/EnumTranslateProvider";
import {useTheme} from "@mui/material/styles";

export type SelectOption = {
    id: string
    value: string
}

type Props = {
    field: string
    label: string
    options: SelectOption[]
    criteriaMap: Map<string, SearchCriteria | undefined>
    setCriteriaMap: Dispatch<SetStateAction<Map<string, SearchCriteria | undefined>>>
    enumTranslation?: TranslationKeyValue
    queryOperator?: QueryOperator
}
export const SelectFilterField = ({
                                      field,
                                      label,
                                      options,
                                      criteriaMap,
                                      setCriteriaMap,
                                      enumTranslation,
                                      queryOperator
                                  }: Props) => {
    const {translateEnum} = useContext(EnumTranslateContext)
    const theme = useTheme()

    const handleValueChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value
        if (value !== 'null') {
            setCriteriaMap(new Map(criteriaMap.set(`${field}`, createSearchCriteria(field,
                queryOperator ? queryOperator : QueryOperator.EQUALS, value))))
        } else {
            criteriaMap.delete(`${field}`)
            setCriteriaMap(new Map(criteriaMap))
        }
    }

    const getValue = () => {
        if (criteriaMap.get(field) !== undefined) {
            const criteria = criteriaMap.get(field)!;
            if (criteria.value !== undefined) {
                return criteria.value;
            }
        }
        return 'null'
    }

    return (
        <Box className={classes.box}>
            <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel
                    color='info'
                >
                    {label}
                </InputLabel>
                <Select
                    value={getValue()}
                    label={label}
                    color='info'
                    SelectDisplayProps={{
                        style: {
                            color: theme.palette.text.primary
                        }
                    }}
                    sx={{
                        "& input": {
                            backgroundColor: theme.palette.textField.background
                        }
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: theme.palette.textField.background
                            }
                        }
                    }}
                    onChange={handleValueChange}>
                    <MenuItem
                        key='null'
                        value='null'
                        defaultChecked
                        className={classes.menuItem}
                        onClick={() => handleValueChange}>
                        -
                    </MenuItem>
                    {options && options.length > 0 && options.map(option =>
                        <MenuItem
                            key={option.id}
                            value={option.value}
                            className={classes.menuItem}
                            onClick={() => handleValueChange}>
                            {enumTranslation ? translateEnum(enumTranslation, option.value) : option.value}
                        </MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    )
}