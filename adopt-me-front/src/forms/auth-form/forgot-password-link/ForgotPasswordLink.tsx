import classes from "./ForgotPasswordLink.module.css";
import React from "react";
import {RoutePath} from "../../../router/RoutePath";
import {useTranslation} from "react-i18next";
import { Link } from "react-router-dom";

export const ForgotPasswordLink = () => {
    const {t} = useTranslation()
    return <Link to={RoutePath.FORGOT_PASSWORD}
                 className={classes.ForgotPasswordLink}>
        {t("pages.login.forgotPasswordLink")}
    </Link>
}