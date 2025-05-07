import {Box, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
    PasswordStrengthChecker,
    PasswordStrengthCheckResult
} from "../../../utils/password-strength-checker/PasswordStrengthChecker";
import classes from "./PasswordStrengthBar.module.css";
import {useTranslation} from "react-i18next";

interface PasswordStrengthProps {
    password: string
}

export const PasswordStrengthBar = ({password}: PasswordStrengthProps) => {

    const {t} = useTranslation()
    const [passwordStrengthState, setPasswordStrengthState] =
        useState<PasswordStrengthCheckResult | undefined>(undefined)

    useEffect(() => {
        setPasswordStrengthState(
            PasswordStrengthChecker.checkPassword(password)
        )
    }, [password])

    if(passwordStrengthState) {
        return <Stack className={classes.PasswordStrengthStack}>
            <Box className={classes.PasswordStrengthBar} bgcolor={
                passwordStrengthState.color
            }/>
            <Typography className={classes.PasswordStrengthBarLabel}>
                {t("pages.register.passwordStrength." + passwordStrengthState.label)}
            </Typography>
        </Stack>
    }
    return <></>
}