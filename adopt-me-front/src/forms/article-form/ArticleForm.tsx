import * as Yup from "yup";
import classes from "./ArticleForm.module.css";
import {FormControl, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {AuthFormTextField} from "../auth-form/auth-form-text-field/AuthFormTextField";
import {AuthFormFileInput} from "../auth-form/auth-form-file-input/AuthFormFileInput";
import {SelectTextField} from "../../components/select-text-field/SelectTextField";
import {CommonButton} from "../../components/button/common-button/CommonButton";
import {ColorType} from "../../types/ColorType";
import * as React from "react";
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {EnumTranslateContext} from "../../providers/enum-translate-provider/EnumTranslateProvider";
import { useFormik} from "formik";
import {
    AnimalBreedTranslate, AnimalColorTranslate, AnimalHairTranslate, AnimalSizeTranslate,
    AnimalTypeTranslate, ArticleTypeTranslate,
} from "../../providers/enum-translate-provider/Translations";
import {useTheme} from "@mui/material/styles";
import {AnimalType} from "../../pages/animal/enum/AnimalType";
import {AnimalBreed} from "../../pages/animal/enum/AnimalBreed";
import {AnimalColor} from "../../pages/animal/enum/AnimalColor";
import {AnimalHair} from "../../pages/animal/enum/AnimalHair";
import {AnimalSize} from "../../pages/animal/enum/AnimalSize";
import {ArticleTypeEnum} from "../../api/article/ArticleTypeEnum";
import {ArticleType} from "../../pages/article/enum/ArticleType";

export interface Article {
    title: string,
    content: string
    attachment: File | null,
    type: string,
    optionsToDelete?: string[]
}

interface ArticleFormProps {
    loading: boolean
    title: string
    updateForm: boolean
    cancelButtonLabel: string
    initialValues: Article,
    submitButtonLabel: string
    handleFormSubmit: (values: Article) => void
}

export const ArticleForm = (props: ArticleFormProps) => {
    const {translateEnum} = useContext(EnumTranslateContext)
    const {t} = useTranslation()
    const theme = useTheme()

    const validationSchema = Yup.object().shape({
        title: Yup
            .string()
            .required(() => t("validation.articleTitle.required")),
        content: Yup
            .string()
            .required(() => t("validation.articleContent.required")),
        attachment: Yup
            .mixed<File>()
            .notRequired(),
        type: Yup
            .string()
            .required(() => t("validation.articleType.required")),
        optionsToDelete: Yup.array().of(
            Yup.string()).notRequired()
    })

    const formik = useFormik({
        initialValues: props.initialValues,
        validationSchema: validationSchema,
        onSubmit: props.handleFormSubmit
    });

    const formFileHandleChange = async (file: File | null) => {
        await formik.setFieldValue("attachment", file, false)
    }

    const handleResetForm = () => {
        formik.resetForm()
    }



    const handleArticleTypeChange = (name: string, value: string) => {
        formik.setFieldValue(name, value)
    }



    const selectTypeItems = [
        {
            label: translateEnum(
                ArticleTypeTranslate,
                ArticleType.ZDROWIE

            ),
            value: ArticleType.ZDROWIE
        }

    ]

    return <Box className={classes.CreateArticlePanel}>
        <FormControl
            component="form"
            onSubmit={() => props.handleFormSubmit(formik.values)}
            className={classes.CreateArticleForm}>
            <Stack className={classes.CreateArticleStack}>
                <Box className={classes.CreateArticleBox} sx={{
                    backgroundColor: theme.palette.createArticle.panel.background,
                    border: `1px ${theme.palette.createArticle.panel.border} solid`
                }}>
                    <Box className={classes.CreateArticleHeader} sx={{
                        color: theme.palette.text.primary
                    }}>
                        {props.title}
                    </Box>
                    <Box className={classes.CreateArticleContent} sx={{
                        borderTop: `1px ${theme.palette.createAnimal.panel.border} solid`
                    }}>
                        <Stack className={classes.FieldsStack}>
                            <AuthFormTextField
                                name="title"
                                label={t("forms.articleForm.fields.title")}
                                value={formik.values.title}
                                touched={formik.touched.title}
                                errorMessage={formik.errors.title}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                            />
                            <AuthFormTextField
                                name="content"
                                label={t("forms.articleForm.fields.content")}
                                value={formik.values.content}
                                touched={formik.touched.content}
                                errorMessage={formik.errors.content}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                            />
                            <AuthFormFileInput
                                name="attachment"
                                value={formik.values.attachment}
                                label={t("forms.animalForm.fields.attachment")}
                                allowedExtensions={["image/jpg", "image/jpeg", "image/png", "image/gif"]}
                                handleChange={formFileHandleChange}
                            />
                            <SelectTextField
                                label={t("forms.articleForm.fields.type")}
                                name="type"
                                value={formik.values.type}
                                handleChange={handleArticleTypeChange}
                                items={selectTypeItems}
                            />
                            <Stack className={classes.CreateArticleButtonStack}>
                                <CommonButton
                                    animated
                                    type="submit"
                                    variant="contained"
                                    color={ColorType.INFO}
                                    disabled={props.loading}
                                    label={props.submitButtonLabel}
                                />
                                <CommonButton
                                    variant="text"
                                    color={ColorType.ERROR}
                                    label={props.cancelButtonLabel}
                                    disabled={props.loading}
                                    handleClick={handleResetForm}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </FormControl>
    </Box>
}