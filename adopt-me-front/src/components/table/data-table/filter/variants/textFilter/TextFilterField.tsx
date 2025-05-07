import {TextField} from "@mui/material";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {createSearchCriteria} from "../../../TableUtils";
import {SearchCriteria} from "../../../../../../api/commons/search/SearchCriteria";
import {QueryOperator} from "../../../../../../api/commons/search/QueryOperator";
import classes from "./TextFilterField.module.css"
import {useTheme} from "@mui/material/styles";

type Props = {
    field: string
    label: string
    criteriaMap: Map<string, SearchCriteria | undefined>
    setCriteriaMap: Dispatch<SetStateAction<Map<string, SearchCriteria | undefined>>>
}
export const TextFilterField = ({field, label, criteriaMap, setCriteriaMap}: Props) => {
    const theme = useTheme()
    const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value
        if (value !== '') {
            setCriteriaMap(new Map(criteriaMap.set(field, createSearchCriteria(field, QueryOperator.LIKE, value))))
        } else {
            criteriaMap.delete(field)
            setCriteriaMap(new Map(criteriaMap))
        }
    }

    const getValue = (): string => {
        if (criteriaMap.get(field) !== undefined) {
            const criteria = criteriaMap.get(field)!;
            if (criteria.value !== undefined) {
                return criteria.value;
            }
        }
        return ''
    }

    return (
        <TextField
            label={label}
            value={getValue()}
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
            onChange={(event) => handleValueChange(event)}/>
    )
}