import classes from "./ChangePasswordMenu.module.css";
import {Box} from "@mui/material";
import * as React from "react";
import {ChangePasswordForm} from "../../../../forms/change-password-form/ChangePasswordForm";
import {useTranslation} from "react-i18next";
import Paper from "@mui/material/Paper";
import {useTheme} from "@mui/material/styles";

interface ChangePasswordMenuProps {
    userId: string
}

export const ChangePasswordMenu = ({userId}: ChangePasswordMenuProps) => {
    const {t} = useTranslation()
    const theme = useTheme()

    return <Paper className={classes.ChangePasswordBox} sx={{
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider} !important`
    }}>
        <Box className={classes.ChangePasswordHeader}>
            {t("pages.changeUserPassword.title")}
        </Box>
        <Box className={classes.ChangePasswordContent} sx={{
            borderTop: `1px solid ${theme.palette.divider} !important`
        }}>
            <ChangePasswordForm userId={userId}/>
        </Box>
    </Paper>
}