import {Checkbox, FormControlLabel, Stack, Typography} from "@mui/material";
import React from "react";
import classes from "./AuthFormCheckBox.module.css";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import { ColorType } from "../../../types/ColorType";

interface AuthFormCheckBoxProps {
    checked: boolean
    type: "rememberMe" | "termsAgreement"
    handleChange: (event: React.ChangeEvent) => void
}

export const AuthFormCheckBox = (props: AuthFormCheckBoxProps) => {
    const {t} = useTranslation()
    return <Stack className={classes.FormCheckBoxStack}>
        <FormControlLabel
            name={props.type}
            label={
                props.type === "rememberMe" ?
                    <Typography className={classes.AuthFormCheckBoxLabel}>
                        {t("pages.login.rememberMeLabel")}
                    </Typography> :
                    <Stack direction="row" spacing={1} className={classes.TermsAgreementCheckBoxStack}>
                        <Typography className={classes.TermsAgreementCheckBoxLabel}>
                            {t("pages.register.termsAgreementLabel")}
                        </Typography>
                        <Typography className={classes.AuthFormCheckBoxLabelUnderlined}>
                            {t("pages.register.termsAgreementLabelUnderlined")}
                        </Typography>
                    </Stack>
            }
            control={
                <Checkbox
                    classes={{
                        checked: classes.AuthCheckedCheckBox
                    }}
                    onChange={props.handleChange}
                    checked={props.checked}
                    className={classes.AuthCheckBox}
                />
            }
        />
    </Stack>
}