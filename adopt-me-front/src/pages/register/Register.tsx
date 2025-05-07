import {Stack} from "@mui/material"
import React, {useContext, useEffect, useState} from "react";
import {RoutePath} from "../../router/RoutePath";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import {AuthForm} from "../../forms/auth-form/AuthForm";
import {
    RegisterFormHorizontalPanel
} from "../../forms/auth-form/register-form-horizontal-panel/RegisterFormHorizontalPanel";
import {AuthFormTextField} from "../../forms/auth-form/auth-form-text-field/AuthFormTextField";
import {AuthFormFileInput} from "../../forms/auth-form/auth-form-file-input/AuthFormFileInput";
import {PasswordStrengthBar} from "../../forms/auth-form/password-strength-bar/PasswordStrengthBar";
import {AuthFormError} from "../../forms/auth-form/auth-form-error/AuthFormError";
import {AuthFormBottomLink} from "../../forms/auth-form/auth-form-bottom-link/AuthFormBottomLink";
import {AuthFormCheckBox} from "../../forms/auth-form/auth-checkbox/AuthFormCheckBox";
import {CommonButton} from "../../components/button/common-button/CommonButton";
import {AuthContext} from "../../providers/auth-provider/AuthProvider";
import {AuthTokenStorage} from "../../storage/AuthTokenStorage";
import {api} from "../../api";
import {SnackbarContext} from "../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../types/SnackbarType";
import {useNavigate} from "react-router-dom";
import {ImageBase64Converter} from "../../utils/image-base64-converter/ImageBase64Converter";
import {ColorType} from "../../types/ColorType";

export const Register = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const {showSnackbar} = useContext(SnackbarContext)
    const {loggedUser, setLoggedUser} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] =
        useState<string | undefined>(undefined)

    const validationSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string(),
        attachment: Yup.mixed<File>().notRequired(),
        email: Yup.string()
            .email(() => t("validation.email.invalid"))
            .required(() => t("validation.email.required")),
        password: Yup.string()
            .required(() => t("validation.password.required")),
        confirmPassword: Yup.string()
            .required(() => t("validation.confirmPassword.required"))
            .oneOf([Yup.ref("password")],
                () => t("validation.confirmPassword.invalid")),
        termsAgreement: Yup.boolean().defined()
    })

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            attachment: null,
            email: "",
            password: "",
            confirmPassword: "",
            termsAgreement: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (values.firstName.length === 0 ||
                values.lastName.length === 0) {
                const message = t("validation.name.required")
                setFormError(message)
                return;
            }

            if (!values.termsAgreement) {
                const message = t("validation.termsAgreement.isTrue")
                setFormError(message)
                return;
            }

            setFormError(undefined)
            setIsLoading(true)

            let attachment;
            if (values.attachment) {
                const imageBase64 = await ImageBase64Converter.convertToBase64(values.attachment)
                attachment = {
                    name: (values.attachment as File).name,
                    imageBase64: imageBase64
                }
            }
            api.loginPass.register({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
                role: "user",
                attachment: attachment
            }).then(() => {
                showSnackbar(
                    t("pages.register.userAccountCreated"),
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

    const formFileHandleChange = async (file: File | null) => {
        await formik.setFieldValue("attachment", file, false)
    }

    useEffect(() => {
        if (loggedUser) {
            setLoggedUser(undefined)
            AuthTokenStorage.removeToken()
        }
    })

    return <AuthForm
        title={t("pages.register.title")}
        subtitle={t("pages.register.subtitle")}
        subtitle2={t("pages.register.subtitle2")!}
        handleSubmit={formik.handleSubmit}>
        <RegisterFormHorizontalPanel>
            <AuthFormTextField
                name="firstName"
                label={t("pages.register.fields.firstName")}
                value={formik.values.firstName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
            <AuthFormTextField
                name="lastName"
                label={t("pages.register.fields.lastName")}
                value={formik.values.lastName}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
        </RegisterFormHorizontalPanel>
        <AuthFormFileInput
            name="attachment"
            value={formik.values.attachment}
            label={t("pages.register.fields.attachment")}
            allowedExtensions={["image/jpg", "image/jpeg", "image/png", "image/gif"]}
            handleChange={formFileHandleChange}
        />
        <AuthFormTextField
            name="email"
            label={t("pages.register.fields.email")}
            value={formik.values.email}
            touched={formik.touched.email}
            errorMessage={formik.errors.email}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
        />
        <AuthFormTextField
            name="password"
            label={t("pages.register.fields.password")}
            type="password"
            value={formik.values.password}
            touched={formik.touched.password}
            errorMessage={formik.errors.password}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
        />
        <AuthFormTextField
            name="confirmPassword"
            label={t("pages.register.fields.confirmPassword")}
            type="password"
            value={formik.values.confirmPassword}
            touched={formik.touched.confirmPassword}
            errorMessage={formik.errors.confirmPassword}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
        />
        <PasswordStrengthBar password={formik.values.password}/>
        <Stack direction="row" justifyContent="start">
            <AuthFormCheckBox
                type="termsAgreement"
                handleChange={formik.handleChange}
                checked={formik.values.termsAgreement}
            />
        </Stack>
        <AuthFormError message={formError}/>
        <CommonButton
            type="submit"
            animated
            color={ColorType.SECONDARY}
            hoverColor={'rgb(114, 84, 227)'}
            disabled={isLoading}
            label={t("pages.register.signUpButtonLabel")}
        />
        <AuthFormBottomLink
            path={RoutePath.LOGIN}
            label={t("pages.register.loginLink")}
        />
    </AuthForm>
}