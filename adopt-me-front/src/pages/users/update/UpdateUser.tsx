import * as Yup from "yup";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import classes from "./UpdateUser.module.css";
import {useTranslation} from "react-i18next";
import {Box, FormControl, Stack} from "@mui/material"
import {AuthFormTextField} from "../../../forms/auth-form/auth-form-text-field/AuthFormTextField";
import {CommonButton} from "../../../components/button/common-button/CommonButton";
import {useFormik} from "formik";
import {ColorType} from "../../../types/ColorType";
import {SelectTextField} from "../../../components/select-text-field/SelectTextField";
import {api} from "../../../api";
import {useParams} from "react-router-dom";
import {UserAccountDto} from "../../../api/user-account/response/UserAccountDto";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../../types/SnackbarType";

interface UpdateUserProps {
    handleUpdate: () => void
}

export const UpdateUser = ({handleUpdate}: UpdateUserProps) => {
    const {t} = useTranslation()
    const {showSnackbar} = useContext(SnackbarContext)
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [userAccount, setUserAccount] = useState<UserAccountDto>()
    const validationSchema = Yup.object().shape({
        firstName:
            Yup.string()
                .required(() => t("validation.password.required")),
        lastName:
            Yup.string()
                .required(() => t("validation.password.required")),
        email:
            Yup.string()
                .required(() => t("validation.password.required")),
        status:
            Yup.string()
                .required(() => t("validation.password.required")),
        role:
            Yup.string()
                .required(() => t("validation.password.required")),
    })

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            status: "",
            role: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (userAccount) {
                setLoading(true)
                api.userAccount.updateUserById({
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    role: values.role,
                    status: values.status
                }, userAccount.id)
                    .then(() => {
                        showSnackbar(
                            t("snackbar.success.userUpdated"),
                            SnackbarType.SUCCESS
                        )
                        handleUpdate()
                    }).catch(() => {
                })
                    .finally(() => {
                        setLoading(false)
                    })
            }
        }
    })

    const handleSelectFieldChange = (name: string, value: string) => {
        formik.setFieldValue(name, value)
    }

    useEffect(() => {
        if (id) {
            setLoading(true)
            api.userAccount.getUser(id)
                .then(userAccountDto => {
                    setUserAccount(userAccountDto)
                    formik.initialValues.firstName = userAccountDto.firstName
                    formik.initialValues.lastName = userAccountDto.lastName
                    formik.initialValues.email = userAccountDto.email
                    formik.initialValues.status = userAccountDto.status
                    formik.initialValues.role = userAccountDto.role
                })
                .catch(() => {
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])

    return <FormControl
        component="form"
        onSubmit={formik.handleSubmit}
        className={classes.UpdateUserForm}>
        <Stack spacing={2}>
            <Box className={classes.HorizontalBox}>
                <AuthFormTextField
                    name="firstName"
                    label={t("pages.updateUser.fields.firstName")}
                    touched={formik.touched.firstName}
                    errorMessage={formik.errors.firstName}
                    value={formik.values.firstName}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                />
                <Box m={1}/>
                <AuthFormTextField
                    name="lastName"
                    label={t("pages.updateUser.fields.lastName")}
                    touched={formik.touched.lastName}
                    errorMessage={formik.errors.lastName}
                    value={formik.values.lastName}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                />
            </Box>
            <AuthFormTextField
                name="email"
                label={t("pages.updateUser.fields.email")}
                touched={formik.touched.email}
                errorMessage={formik.errors.email}
                value={formik.values.email}
                handleChange={formik.handleChange}
                handleBlur={formik.handleBlur}
            />
            <SelectTextField
                name="role"
                label={t("pages.updateUser.fields.role")}
                value={formik.values.role}
                handleChange={handleSelectFieldChange}
                items={[
                    {
                        label: t("pages.updateUser.fields.roleSelect.adminRole"),
                        value: "ADMIN"
                    },
                    {
                        label: t("pages.updateUser.fields.roleSelect.userRole"),
                        value: "USER"
                    }
                ]}
            />
            <SelectTextField
                name="status"
                label={t("pages.updateUser.fields.status")}
                value={formik.values.status}
                handleChange={handleSelectFieldChange}
                items={[
                    {
                        label: t("pages.updateUser.fields.statusSelect.activeStatus"),
                        value: "ACTIVE"
                    },
                    {
                        label: t("pages.updateUser.fields.statusSelect.inactiveStatus"),
                        value: "INACTIVE"
                    }
                ]}
            />
            <CommonButton
                type="submit"
                animated
                disabled={loading}
                color={ColorType.INFO}
                label={t("pages.updateUser.updateButtonLabel")}
            />
        </Stack>
    </FormControl>
}