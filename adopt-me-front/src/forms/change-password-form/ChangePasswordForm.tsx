import * as Yup from "yup";
import classes from "./ChangePasswordForm.module.css";
import React, {useContext, useState} from "react";
import {AuthFormTextField} from "../auth-form/auth-form-text-field/AuthFormTextField";
import {useFormik} from "formik";
import {CommonButton} from "../../components/button/common-button/CommonButton";
import {FormControl, Stack} from "@mui/material";
import {t} from "i18next";
import {ColorType} from "../../types/ColorType";
import {api} from "../../api";
import {SnackbarContext} from "../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../types/SnackbarType";
import Box from "@mui/system/Box/Box";

interface ChangePasswordFormProps {
    userId: string
}

export const ChangePasswordForm = ({userId}: ChangePasswordFormProps) => {

    const [loading, setLoading] = useState(false)
    const {showSnackbar} = useContext(SnackbarContext)
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required(() => t("validation.password.required")),
        confirmPassword: Yup.string()
            .required(() => t("validation.confirmPassword.required"))
            .oneOf([Yup.ref("password")],
                () => t("validation.confirmPassword.invalid")),
    })

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true)
            api.loginPass.changeUserPassword({
                userId: userId,
                newPassword: values.password
            }).then(() => {
                showSnackbar(
                    t("snackbar.success.userPasswordChanged"),
                    SnackbarType.SUCCESS
                )
                formik.resetForm()
            }).catch(() => {})
                .finally(() => {
                    setLoading(false)
                })
        }
    })

    return <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        className={classes.ChangePasswordForm}>
        <Stack spacing={2}>
            <AuthFormTextField
                name="password"
                label={t("pages.changeUserPassword.fields.password")}
                type="password"
                touched={formik.touched.password}
                errorMessage={formik.errors.password}
                value={formik.values.password}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
            <AuthFormTextField
                name="confirmPassword"
                label={t("pages.changeUserPassword.fields.confirmPassword")}
                type="password"
                touched={formik.touched.confirmPassword}
                errorMessage={formik.errors.confirmPassword}
                value={formik.values.confirmPassword}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
            <Stack className={classes.ChangePasswordButtonStack}>
                <CommonButton
                    type="submit"
                    animated
                    disabled={loading}
                    color={ColorType.INFO}
                    label={t("pages.changeUserPassword.changePasswordButtonLabel")}
                />
                <Box m={1}/>
                <CommonButton
                    variant="text"
                    disabled={false}
                    color={ColorType.ERROR}
                    label={t("pages.changeUserPassword.clearFormButtonLabel")}
                    handleClick={formik.resetForm}
                />
            </Stack>
        </Stack>
    </FormControl>
}