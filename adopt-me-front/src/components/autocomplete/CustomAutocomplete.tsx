import {Autocomplete, AutocompleteRenderOptionState, TextField} from "@mui/material";
import {SelectOption} from "../table/data-table/filter/variants/selectFilter/SelectFilterField";
import classes from "./CustomAutocomplete.module.css"
import {HTMLAttributes} from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {useTheme} from "@mui/material/styles";


type Props = {
    id: string
    options: SelectOption[]
    holderText: string
    value: SelectOption[] | undefined
    setValue: (value: SelectOption[] | undefined) => void
}

export const CustomAutocomplete = ({id, options, holderText, value, setValue}: Props) => {
    const theme = useTheme()

    const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: SelectOption, state: AutocompleteRenderOptionState) => {
        return (
            <li {...props} className={classes.checkBoxContainer}>
                <Checkbox
                    icon={<CheckBoxOutlineBlankIcon/>}
                    checkedIcon={<CheckBoxIcon color='info'/>}
                    color='info'
                    checked={state.selected}
                />
                {option.value}
            </li>
        )
    }

    return (
        <Autocomplete
            className={classes.autoComplete}
            disablePortal
            ChipProps={{
                color: 'info'
            }}
            id={id}
            multiple
            slotProps={{
                paper: {
                    sx:{
                        backgroundColor: theme.palette.background.default
                    }
                }
            }}
            disableCloseOnSelect
            value={value !== undefined ? value : []}
            onChange={(_, value) => setValue(value !== null ? value : undefined)}
            options={options}
            renderOption={(props, option, state) => renderOption(props, option, state)}
            getOptionLabel={(option) => option.value}
            renderInput={(params) =>
                <TextField
                    {...params}
                    label={holderText}
                    color='info'
                />}
        />
    )
}