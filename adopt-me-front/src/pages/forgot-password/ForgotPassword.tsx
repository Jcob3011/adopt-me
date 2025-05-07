import React, {useContext, useEffect, useState} from "react";
import {api} from "../../api";
import {RoutePath} from "../../router/RoutePath";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import {AuthForm} from "../../forms/auth-form/AuthForm";
import {AuthFormTextField} from "../../forms/auth-form/auth-form-text-field/AuthFormTextField";
import {AuthFormBottomLink} from "../../forms/auth-form/auth-form-bottom-link/AuthFormBottomLink";
import {CommonButton} from "../../components/button/common-button/CommonButton";
import {SnackbarContext} from "../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../types/SnackbarType";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../providers/auth-provider/AuthProvider";
import {AuthTokenStorage} from "../../storage/AuthTokenStorage";
import {ColorType} from "../../types/ColorType";

export const ForgotPassword = () => {

    const navigate = useNavigate()
    const {t} = useTranslation()
    const {showSnackbar} = useContext(SnackbarContext)
    const {loggedUser, setLoggedUser} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(() => t("validation.email.invalid"))
            .required(() => t("validation.email.required"))
    })

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true)
            api.loginPass.sendNotificationToResetPassword({
                email: values.email
            }).then(() => {
                showSnackbar(
                    t("pages.forgotPassword.mailSentMessage"),
                    SnackbarType.SUCCESS
                )
                setTimeout(() => {
                    navigate(RoutePath.LOGIN)
                }, 1000)
            }).catch(() => {})
                .finally(() => {
                    setIsLoading(false)
                })
        }
    })

    useEffect(() => {
        if (loggedUser) {
            setLoggedUser(undefined)
            AuthTokenStorage.removeToken()
        }
    })

    return <AuthForm
        title={t("pages.forgotPassword.title")}
        subtitle={t("pages.forgotPassword.subtitle")}
        handleSubmit={formik.handleSubmit}>
        <AuthFormTextField
            name="email"
            label={t("pages.forgotPassword.fields.email")}
            value={formik.values.email}
            touched={formik.touched.email}
            errorMessage={formik.errors.email}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
        />
        <CommonButton
            type="submit"
            color={ColorType.SECONDARY}
            hoverColor={'rgb(114, 84, 227)'}
            animated
            disabled={isLoading}
            label={t("pages.forgotPassword.sendMailButtonLabel")}
        />
        <AuthFormBottomLink
            path={RoutePath.LOGIN}
            label={t("pages.forgotPassword.loginLink")}
        />
    </AuthForm>
}