import {Box} from "@mui/system"
import classes from "./UsersCreate.module.css"
import {useTranslation} from "react-i18next";
import * as React from "react";
import {useContext, useState} from "react";
import {AuthFormTextField} from "../../../forms/auth-form/auth-form-text-field/AuthFormTextField";
import {AuthFormFileInput} from "../../../forms/auth-form/auth-form-file-input/AuthFormFileInput";
import {CommonButton} from "../../../components/button/common-button/CommonButton";
import * as Yup from "yup";
import {useFormik} from "formik";
import {api} from "../../../api";
import {SnackbarType} from "../../../types/SnackbarType";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {ColorType} from "../../../types/ColorType";
import {FormControl, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const UsersCreate = () => {

    const {t} = useTranslation()
    const navigate = useNavigate()
    const {showSnackbar} = useContext(SnackbarContext)
    const [loading, setLoading] = useState(false)
    const theme = useTheme()

    const initialValues = {
        firstName: "",
        lastName: "",
        attachment: null,
        email: "",
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(() => t("validation.firstName.required")),
        lastName: Yup.string().required(() => t("validation.lastName.required")),
        attachment: Yup.mixed<File>().notRequired(),
        email: Yup.string()
            .email(() => t("validation.email.invalid"))
            .required(() => t("validation.email.required")),
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                let attachmentId;
                if (values.attachment) {
                    const attachment = await api.attachment.save(
                        "user image",
                        "user image",
                        values.attachment
                    );
                    attachmentId = attachment.id;
                }

                const userAccount = await api.userAccount.saveUser({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    role: "user",
                });

                await api.userAccount.updateUserById({
                    firstName: userAccount.firstName,
                    lastName: userAccount.lastName,
                    email: userAccount.email,
                    role: userAccount.role,
                    status: "active",
                    attachmentId: attachmentId
                }, userAccount.id)

                await api.loginPass.sendNotificationToResetPassword({
                    email: values.email,
                });

                formik.resetForm();
                showSnackbar(
                    t("snackbar.success.userAccountCreated"),
                    SnackbarType.SUCCESS
                );
                navigate(`/users/details/${userAccount.id}`)
            } finally {
                setLoading(false);
            }
        },
    });

    const formFileHandleChange = async (file: File | null) => {
        await formik.setFieldValue("attachment", file, false)
    }

    const handleResetForm = () => {
        formik.resetForm()
    }

    return <Box className={classes.UsersCreatePanel} sx={{
        backgroundColor: theme.palette.background.default
    }}>
        <Paper className={classes.UsersCreateBox} sx={{
            backgroundColor: theme.palette.background.default,
            color: `${theme.palette.user.create.userCreateBox.color} !important`,
            border: `1px solid ${theme.palette.user.create.userCreateBox.borderColor} !important`
        }}>
            <Box className={classes.UsersCreateHeader} sx={{
                color: `${theme.palette.user.create.userCreateHeader.color} !important`
            }}>
                {t("pages.createUser.title")}
            </Box>
            <Box className={classes.UsersCreateContent} sx={{
                borderTop: `1px solid ${theme.palette.user.create.userCreateContent.borderColor} !important`
            }}>
                <FormControl
                    component="form"
                    onSubmit={formik.handleSubmit}
                    className={classes.UsersCreateForm}>
                    <Stack spacing={2}>
                        <AuthFormTextField
                            name="firstName"
                            label={t("pages.createUser.fields.firstName")}
                            value={formik.values.firstName}
                            touched={formik.touched.firstName}
                            errorMessage={formik.errors.firstName}
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                        />
                        <AuthFormTextField
                            name="lastName"
                            label={t("pages.createUser.fields.lastName")}
                            value={formik.values.lastName}
                            touched={formik.touched.lastName}
                            errorMessage={formik.errors.lastName}
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                        />
                        <AuthFormTextField
                            name="email"
                            label={t("pages.createUser.fields.email")}
                            value={formik.values.email}
                            touched={formik.touched.email}
                            errorMessage={formik.errors.email}
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                        />
                        <AuthFormFileInput
                            name="attachment"
                            value={formik.values.attachment}
                            label={t("pages.createUser.fields.attachment")}
                            allowedExtensions={["image/jpg", "image/jpeg", "image/png", "image/gif"]}
                            handleChange={formFileHandleChange}
                        />
                        <Box className={classes.ButtonsBox}>
                            <CommonButton
                                type="submit"
                                animated
                                disabled={loading}
                                color={ColorType.INFO}
                                label={t("pages.createUser.createUserButtonLabel")}
                            />
                            <Box mr={1}/>
                            <CommonButton
                                animated
                                variant="text"
                                color={ColorType.ERROR}
                                label={t("pages.createUser.clearFormButtonLabel")}
                                handleClick={handleResetForm}
                            />
                        </Box>
                    </Stack>
                </FormControl>
            </Box>
        </Paper>
    </Box>
}