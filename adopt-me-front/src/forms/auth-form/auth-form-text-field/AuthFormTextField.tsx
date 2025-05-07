import {TextField} from "@mui/material";
import React, {useState} from "react";
import {ShowPasswordIcon} from "../show-password-icon/ShowPasswordIcon";
import classes from "./AuthFormTextField.module.css";
import {useTheme} from "@mui/material/styles";

interface AuthFormTextFieldProps {
    type?: "normal" | "password"
    name: string
    label: string
    value: string
    touched?: boolean
    errorMessage?: string
    handleChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.ChangeEvent<any>) => void;
}

export const AuthFormTextField = (props: AuthFormTextFieldProps) => {
    const theme = useTheme()
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const error = props.touched && Boolean(props.errorMessage)

    return <TextField
        fullWidth
        autoComplete="off"
        label={props.label}
        name={props.name}
        type={props.type === "password" && !showPassword ? "password" : "text"}
        variant="filled"
        value={props.value}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        error={error}
        helperText={error && props.errorMessage}
        sx={{
            '& svg': {
                fill: theme.palette.grey["600"]
            }
        }}
        FormHelperTextProps={{
            className: classes.AuthFormTextFieldError
        }}
        InputLabelProps={{
            classes: {
                error: classes.AuthFormTextFieldError,
                focused: classes.AuthFormTextFieldFocusLabel
            },
            className: classes.AuthFormTextFieldLabel,
            style: {
                color: `${theme.palette.authForm.textField.color}`,
            }
        }}
        InputProps={{
            classes: {
                focused: error ?
                    classes.AuthFormTextFieldErrorFocus :
                    classes.AuthFormTextFieldFocus
            },
            className: error ?
                classes.AuthFormTextFieldBorderError :
                classes.AuthFormTextField,
            disableUnderline: true,
            sx: {
                border: `1px solid ${theme.palette.authForm.textField.border}`,
                backgroundColor: theme.palette.authForm.textField.backgroundColor,
                ':hover': {
                    border: `1px ${theme.palette.authForm.textField.hoverBorderColor} solid`,
                    backgroundColor: theme.palette.authForm.textField.hoverColor
                }
            },
            endAdornment: props.type === "password" ?
                <ShowPasswordIcon
                    showIcon={showPassword}
                    handleClick={handleShowPassword}
                /> : undefined
        }}
    />
}