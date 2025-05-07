import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React, {useContext, useEffect, useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {RoutePath} from "../../router/RoutePath";
import {AuthForm} from "../../forms/auth-form/AuthForm";
import {AuthFormTextField} from "../../forms/auth-form/auth-form-text-field/AuthFormTextField";
import {CommonButton} from "../../components/button/common-button/CommonButton";
import {AuthFormBottomLink} from "../../forms/auth-form/auth-form-bottom-link/AuthFormBottomLink";
import {api} from "../../api";
import {LoadingSpinner} from "../../components/loading-spinner/LoadingSpinner";
import {SnackbarContext} from "../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../types/SnackbarType";
import {PasswordStrengthBar} from "../../forms/auth-form/password-strength-bar/PasswordStrengthBar";
import {ColorType} from "../../types/ColorType";

export const PasswordReset = () => {
    const navigate = useNavigate()
    const {token} = useParams()
    const {t} = useTranslation()
    const {showSnackbar} = useContext(SnackbarContext)
    const [isLoading, setIsLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required(() => t("validation.password.required")),
        confirmPassword: Yup.string()
            .required(() => t("validation.confirmPassword.required"))
            .oneOf([Yup.ref("newPassword")], () => t("validation.confirmPassword.invalid"))
    })

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true)
            api.loginPass.resetPassword({
                token: token!,
                newPassword: values.newPassword
            }).then(() => {
                showSnackbar(
                    t("snackbar.success.passwordReset"),
                    SnackbarType.SUCCESS
                )
                navigate(RoutePath.LOGIN)
            }).catch(() => {
                navigate(RoutePath.LOGIN)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    })

    useEffect(() => {
        if (token) {
            api.loginPass.validateToken({token: token})
                .then(() => {
                    setPageLoading(false)
                }).catch(() => {
                navigate(RoutePath.LOGIN)
            })
        } else {
            navigate(RoutePath.LOGIN)
        }
    }, [])

    return pageLoading ?
        <LoadingSpinner entireScreen/> :
        <AuthForm
            title={t("pages.passwordReset.title")}
            subtitle={t("pages.passwordReset.subtitle")}
            handleSubmit={formik.handleSubmit}>
            <AuthFormTextField
                name="newPassword"
                label={t("pages.passwordReset.fields.newPassword")}
                type="password"
                value={formik.values.newPassword}
                touched={formik.touched.newPassword}
                errorMessage={formik.errors.newPassword}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
            <AuthFormTextField
                name="confirmPassword"
                label={t("pages.passwordReset.fields.confirmPassword")}
                type="password"
                value={formik.values.confirmPassword}
                touched={formik.touched.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
            <PasswordStrengthBar password={formik.values.newPassword}/>
            <CommonButton
                type="submit"
                animated
                color={ColorType.SECONDARY}
                disabled={isLoading}
                label={t("pages.passwordReset.resetPasswordButtonLabel")}
            />
            <AuthFormBottomLink
                path={RoutePath.LOGIN}
                label={t("pages.passwordReset.loginLink")}
            />
        </AuthForm>
}