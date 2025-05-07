import {FormControl, FormHelperText, InputProps, TextField} from "@mui/material";
import React from "react";
import classes from "./ValidatedTextField.module.css"
import {useTheme} from "@mui/material/styles";

type valueType = 'text' | 'number' | 'email'

type Props = {
    id: string
    name: string
    label: string
    value: string
    type?: valueType
    inputProps?: InputProps
    helperText?: string
    handleChange: (e: React.ChangeEvent<any>) => void
    touched?: boolean
    errorMessage?: string
    handleBlur: (e: React.ChangeEvent<any>) => void
    minWidth?: number
}
export const ValidatedTextField = ({
                                       id,
                                       name,
                                       label,
                                       value,
                                       type,
                                       helperText,
                                       inputProps,
                                       handleChange,
                                       touched,
                                       errorMessage,
                                       handleBlur,
                                       minWidth
                                   }: Props) => {
    const theme = useTheme()
    const isError: boolean = !!errorMessage && !!touched

    return (
        <FormControl

        >
            <TextField
                id={id}
                name={name}
                label={label}
                value={value}
                InputProps={{
                    ...inputProps,
                    className: classes.text,
                    style: {
                        backgroundColor: "inherit"
                    }
                }}
                color='info'
                type={type ? type : 'text'}
                onChange={handleChange}
                error={isError}
                onBlur={handleBlur}
                sx={minWidth ? {minWidth: `${minWidth}px !important`} : {}}
                className={classes.textField}
            />
            <FormHelperText
                sx={isError ? {color: 'indianred'} : {}}
            >
                {isError ? errorMessage : (helperText ? helperText : '')}
            </FormHelperText>
        </FormControl>
    )
}