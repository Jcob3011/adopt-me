import React from "react"
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material"
import classes from "./SelectTextField.module.css"
import {useTheme} from "@mui/material/styles";

interface SelectTextFieldProps {
    label: string
    name: string
    value: string
    handleChange: (name: string, value: string) => void
    items: {
        label: string
        value: string
    }[]
}

export const SelectTextField = (props: SelectTextFieldProps) => {
    const theme = useTheme()

    const handleChange = (event: SelectChangeEvent) => {
        props.handleChange(props.name, event.target.value)
    }

    return <FormControl variant="filled">
        <InputLabel
            sx={{
                color: theme.palette.text.primary
            }}
            className={classes.SelectTextFieldLabel}>
            {props.label}
        </InputLabel>
        <Select
            value={props.value}
            onChange={handleChange}
            className={classes.SelectTextField}
            autoComplete="off"
            sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.authForm.textField.backgroundColor,
                border: `1px solid ${theme.palette.authForm.textField.border} !important`,
                borderRadius: '4px !important'
            }}
            MenuProps={{
                PaperProps: {
                    sx: {
                        backgroundColor: theme.palette.background.default
                    }
                }
            }}
            disableUnderline
            classes={{
                filled: classes.SelectTextFieldFilled,
                select: classes.SelectTextFieldSelected
            }}>
            {props.items.map(item =>
                <MenuItem
                    key={item.value}
                    value={item.value}
                    className={classes.MenuItem}
                    classes={{
                        selected: classes.MenuItemSelected
                    }}>
                    {item.label}
                </MenuItem>
            )}
        </Select>
    </FormControl>
}