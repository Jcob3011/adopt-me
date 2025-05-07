import {api} from "../../api";
import {RedirectUrlResponse} from "../../api/gmail-auth/response/RedirectUrlResponse";
import React, {useContext, useEffect, useState} from "react";
import {RoutePath} from "../../router/RoutePath";
import * as Yup from "yup"
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import {AuthForm} from "../../forms/auth-form/AuthForm";
import {AuthFormTextField} from "../../forms/auth-form/auth-form-text-field/AuthFormTextField";
import {LoginFormHorizontalPanel} from "../../forms/auth-form/login-form-horizontal-panel/LoginFormHorizontalPanel";
import {AuthFormCheckBox} from "../../forms/auth-form/auth-checkbox/AuthFormCheckBox";
import {ForgotPasswordLink} from "../../forms/auth-form/forgot-password-link/ForgotPasswordLink";
import {AuthFormBottomLink} from "../../forms/auth-form/auth-form-bottom-link/AuthFormBottomLink";
import {CommonButton} from "../../components/button/common-button/CommonButton";
import GoogleLogo from "../../assets/images/google-logo.png";
import {AuthContext, AuthContextType} from "../../providers/auth-provider/AuthProvider";
import {useNavigate} from "react-router-dom";
import {AuthTokenStorage} from "../../storage/AuthTokenStorage";
import {ColorType} from "../../types/ColorType";
import {useTheme} from "@mui/material/styles";

export const Login = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const {t} = useTranslation()
    const {loggedUser, setLoggedUser} = useContext<AuthContextType>(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(() => t("validation.email.invalid"))
            .required(() => t("validation.email.required")),
        password: Yup.string()
            .required(() => t("validation.password.required")),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true)
            api.loginPass.login({
                email: values.email,
                password: values.password,
            }, values.rememberMe).then(async () => {
                const loggedUser = await api.userAccount.getSelfUser()
                setLoggedUser(loggedUser)
                navigate(RoutePath.HOME)
            }).catch(() => {})
                .finally(() => {
                    setIsLoading(false)
                })
        }
    })

    const handleSignInWithGoogle = async () => {
        setIsLoading(true)
        const {url}: RedirectUrlResponse = await api.gmailAuth.getGmailAuthUrl()
        window.location.replace(url)
    }

    useEffect(() => {
        if (loggedUser) {
            setLoggedUser(undefined)
            AuthTokenStorage.removeToken()
        }
    }, [])

    return <AuthForm
        title={t("pages.login.title")}
        subtitle={t("pages.login.subtitle")}
        handleSubmit={formik.handleSubmit}>
        <AuthFormTextField
            name="email"
            label={t("pages.login.fields.email")}
            value={formik.values.email}
            touched={formik.touched.email}
            errorMessage={formik.errors.email}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
        />
        <AuthFormTextField
            name="password"
            label={t("pages.login.fields.password")}
            type="password"
            value={formik.values.password}
            touched={formik.touched.password}
            errorMessage={formik.errors.password}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
        />
        <LoginFormHorizontalPanel>
            <AuthFormCheckBox
                checked={formik.values.rememberMe}
                type="rememberMe"
                handleChange={formik.handleChange}
            />
            <ForgotPasswordLink/>
        </LoginFormHorizontalPanel>
        <CommonButton
            type="submit"
            color={ColorType.SECONDARY}
            hoverColor={'rgb(114, 84, 227)'}
            animated
            disabled={isLoading}
            label={t("pages.login.signInButtonLabel")}
        />

        <AuthFormBottomLink
            path={RoutePath.REGISTER}
            label={t("pages.login.registrationLink")}
        />
    </AuthForm>
}