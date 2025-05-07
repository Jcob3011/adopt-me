import {useTranslation} from "react-i18next";
import React, {useContext, useEffect, useState} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {RoutePath} from "../../router/RoutePath";
import {AuthForm} from "../../forms/auth-form/AuthForm";
import {AuthFormTextField} from "../../forms/auth-form/auth-form-text-field/AuthFormTextField";
import {PasswordStrengthBar} from "../../forms/auth-form/password-strength-bar/PasswordStrengthBar";
import {CommonButton} from "../../components/button/common-button/CommonButton";
import {AuthFormBottomLink} from "../../forms/auth-form/auth-form-bottom-link/AuthFormBottomLink";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../api";
import {AuthContext} from "../../providers/auth-provider/AuthProvider";
import {LoadingSpinner} from "../../components/loading-spinner/LoadingSpinner";
import {ColorType} from "../../types/ColorType";

export const GmailSetPassword = () => {
    const {token} = useParams()
    const navigate = useNavigate()
    const {setLoggedUser} = useContext(AuthContext)
    const {t} = useTranslation()
    const [isLoading, setIsLoading] = useState(true)
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required(() => t("validation.password.required")),
        confirmPassword: Yup.string()
            .required(() => t("validation.confirmPassword.required"))
            .oneOf([Yup.ref("password")], () => t("validation.confirmPassword.invalid"))
    })

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (token) {
                setIsLoading(true)
                try {
                    await api.gmailAuth.authenticate({tokenId: token})
                    await api.loginPass.setPasswordToGmailAccount({
                        tokenId: token,
                        password: values.password
                    })
                    const loggedUser = await api.userAccount.getSelfUser()
                    setLoggedUser(loggedUser)
                    navigate(RoutePath.HOME)
                } catch (exception) {
                    navigate(RoutePath.LOGIN)
                } finally {
                    setIsLoading(false)
                }
            }
        }
    })

    useEffect(() => {
        if (token) {
            api.gmailAuth.validateTokenId({tokenId: token})
                .catch(() => navigate(RoutePath.LOGIN))
            setIsLoading(false)
        } else {
            navigate(RoutePath.LOGIN)
        }
    }, [])

    return isLoading ?
        <LoadingSpinner entireScreen/> :
        <AuthForm
            title={t("pages.gmailSetPassword.title")}
            subtitle={t("pages.gmailSetPassword.subtitle")}
            handleSubmit={formik.handleSubmit}>
            <AuthFormTextField
                name="password"
                label={t("pages.gmailSetPassword.fields.password")}
                type="password"
                value={formik.values.password}
                touched={formik.touched.password}
                errorMessage={formik.errors.password}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
            <AuthFormTextField
                name="confirmPassword"
                label={t("pages.gmailSetPassword.fields.confirmPassword")}
                type="password"
                value={formik.values.confirmPassword}
                touched={formik.touched.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
            <PasswordStrengthBar password={formik.values.password}/>
            <CommonButton
                type="submit"
                animated
                color={ColorType.SECONDARY}
                disabled={isLoading}
                label={t("pages.gmailSetPassword.setPasswordButtonLabel")}
            />
            <AuthFormBottomLink
                path={RoutePath.LOGIN}
                label={t("pages.gmailSetPassword.loginLink")}
            />
        </AuthForm>
}