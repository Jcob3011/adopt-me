import React, {useContext} from "react";
import classes from "./AuthFormFileInput.module.css";
import {MuiFileInput} from "mui-file-input";
import {styled, useTheme} from "@mui/material/styles";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../../types/SnackbarType";
import { useTranslation } from "react-i18next";
import {MAX_FILE_SIZE_IN_BYTES} from "./AuthFormFileInput.config";

interface AuthFormFileInputProps {
    name: string
    label: string
    allowedExtensions: string[]
    handleChange: (file: File | null) => void
    value: File | null
}


export const AuthFormFileInput = (props: AuthFormFileInputProps) => {
    const theme = useTheme()
    theme.palette.mode = 'light'
    const {t} = useTranslation()
    const {showSnackbar} = useContext(SnackbarContext)

    const MuiFileInputStyled = styled(MuiFileInput)`
      & svg {
        fill: ${theme.palette.authForm.textField.color} !important;
      }
      & span {
        color: ${theme.palette.authForm.textField.color} !important;
      }
    `
    const handleChange = async (file: File | File[] | null) => {
        if (file && !Array.isArray(file)) {
            if (!props.allowedExtensions.includes(file.type)) {
                showSnackbar(
                    t("snackbar.error.invalidFileExtension"),
                    SnackbarType.ERROR)
                return
            }
            if(file.size > MAX_FILE_SIZE_IN_BYTES) {
                showSnackbar(
                    t("snackbar.error.tooBigFileSize"),
                    SnackbarType.ERROR)
                return
            }
            props.handleChange(file)
        } else {
            props.handleChange(null)
        }
    }

    return <MuiFileInputStyled
        fullWidth
        name={props.name}
        placeholder={props.label}
        value={props.value}
        onChange={handleChange}
        FormHelperTextProps={{
            className: classes.AuthFormFileInput,
        }}
        InputLabelProps={{
            classes: {
                error: classes.AuthFormFileInput
            },
            className: classes.AuthFormFileInput
        }}
        InputProps={{
            sx: {
                backgroundColor: `${theme.palette.authForm.fileInput.backgroundColor}`
            },
            className: classes.AuthFormFileInput,
            classes: {
                focused: classes.AuthFormFileInputFocused
            }
        }}
    />
}