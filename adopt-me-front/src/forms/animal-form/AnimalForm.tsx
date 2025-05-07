import * as Yup from "yup";
import classes from "./AnimalForm.module.css";
import {FormControl, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import {AuthFormTextField} from "../auth-form/auth-form-text-field/AuthFormTextField";
import {AuthFormFileInput} from "../auth-form/auth-form-file-input/AuthFormFileInput";
import {SelectCheckboxField} from "../../components/select-checkbox-field/SelectCheckboxField";
import {api} from "../../api";
import {SelectTextField} from "../../components/select-text-field/SelectTextField";
import {CommonButton} from "../../components/button/common-button/CommonButton";
import {ColorType} from "../../types/ColorType";
import * as React from "react";
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {EnumTranslateContext} from "../../providers/enum-translate-provider/EnumTranslateProvider";
import {FormikErrors, FormikTouched, useFormik} from "formik";
import {
    AnimalBreedTranslate, AnimalColorTranslate, AnimalHairTranslate, AnimalSizeTranslate,
    AnimalTypeTranslate,
} from "../../providers/enum-translate-provider/Translations";
import {useTheme} from "@mui/material/styles";
import {AnimalType} from "../../pages/animal/enum/AnimalType";
import {AnimalBreed} from "../../pages/animal/enum/AnimalBreed";
import {AnimalColor} from "../../pages/animal/enum/AnimalColor";
import {AnimalHair} from "../../pages/animal/enum/AnimalHair";
import {AnimalSize} from "../../pages/animal/enum/AnimalSize";
import {AnimalHealth} from "../../pages/animal/create/healthBooklet/HealthBooklet";
import {AddAnimalButton} from "../../pages/animal/create/healthBooklet/button/add-health-button/AddHealthButton";

export interface Animal {
    name: string,
    age: string,
    attachment: File | null,
    tags: string[],
    type: string,
    breed: string,
    color: string,
    size: string,
    hair: string,
    healthBooklet: HealthBooklet[],
    town: string,
    contact: string,
    optionsToDelete?: string[]
}

interface HealthBooklet {
    id?: string,
    sex: string,
    health: boolean,
    description: string,
}

interface AnimalFormProps {
    loading: boolean
    title: string
    updateForm: boolean
    cancelButtonLabel: string
    initialValues: Animal,
    submitButtonLabel: string
    handleFormSubmit: (values: Animal) => void
}

export const AnimalForm = (props: AnimalFormProps) => {
    const [showAnswers, setShowAnswers] = useState(true)
    const {translateEnum} = useContext(EnumTranslateContext)
    const {t} = useTranslation()
    const theme = useTheme()

    const validationSchema = Yup.object().shape({
        name: Yup
            .string()
            .required(() => t("pages.validation.animalName.required")),
        age: Yup
            .string()
            .required(() => t("validation.animalAge.required")),
        attachment: Yup
            .mixed<File>()
            .notRequired(),
        tags: Yup
            .array()
            .of(Yup.string())
            .min(1, () => t("validation.tags.required")),
        type: Yup
            .string()
            .required(() => t("validation.lastName.required")),
        breed: Yup
            .string()
            .required(),
        color: Yup
            .string()
            .required(),
        hair: Yup
            .string()
            .required(),
        size: Yup
            .string()
            .required(),
        town: Yup
            .string()
            .required(() => t("validation.animalTown.required")),
        contact: Yup
            .string()
            .required(() => t("validation.animalContact.required")),
        healthBooklet: Yup
            .array().of(
                Yup.object().shape({
                    sex: Yup.string(),
                    health: Yup.boolean(),
                    description: Yup.string()
                        .required(() =>
                            t("validation.animalDescription.required"))
                })
            ).notRequired(),
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

    const handleAddHealth = () => {
        formik.setFieldValue("health", [...formik.values.healthBooklet, {
            sex:"",
            health: false,
            description: ""
        }])
    }

    const handleDeleteHealth = async (index: number) => {
        const healthBookletId = formik.values.healthBooklet[index].id
        if (healthBookletId && props.updateForm) {
            const optionsToDelete = [...(formik.values.optionsToDelete || []), healthBookletId]
            await formik.setFieldValue("optionsToDelete", optionsToDelete)
        }
        const health = formik.values.healthBooklet
            .filter((option: HealthBooklet, optionIndex: number) => optionIndex !== index)
        await formik.setFieldValue("options", healthBookletId)
    }

    const handleHealth = (index: number, health: boolean) => {
        const healthBooklet = formik.values.healthBooklet
        healthBooklet[index] = {
            sex: healthBooklet[index].sex,
            health: health,
            description: healthBooklet[index].description
        }
        formik.setFieldValue("health", healthBooklet)
    }

    const getHealthErrorMessage = (index: number) => {
        return formik.errors.healthBooklet &&
            formik.errors.healthBooklet[index] &&
            (formik.errors.healthBooklet[index] as FormikErrors<{ description: string }>).description
    }

    const getHealthTouched = (index: number) => {
        return Boolean(formik.touched.healthBooklet &&
            formik.touched.healthBooklet[index] &&
            (formik.touched.healthBooklet[index] as FormikTouched<{
                description: string
            }>).description)
    }


    const handleAnimalTypeChange = (name: string, value: string) => {
        formik.setFieldValue(name, value)
    }
    const handleAnimalBreedChange = (name: string, value: string) => {
        formik.setFieldValue(name, value)
    }
    const handleAnimalColorChange = (name: string, value: string) => {
        formik.setFieldValue(name, value)
    }
    const handleAnimalSizeChange = (name: string, value: string) => {
        formik.setFieldValue(name, value)
    }
    const handleAnimalHairChange = (name: string, value: string) => {
        formik.setFieldValue(name, value)
    }


    const handleTagsChange = (items: string[]) => {
        formik.setFieldValue("tags", items)
    }


    const selectTypeItems = [
        {
            label: translateEnum(
                AnimalTypeTranslate,
                AnimalType.DOG

            ),
            value: AnimalType.DOG
        },
        {
            label: translateEnum(
                AnimalTypeTranslate,
                AnimalType.CAT

            ),
            value: AnimalType.CAT
        },
    ]

    const selectBreedItems = [
        {
            label: translateEnum(
                AnimalBreedTranslate,
                AnimalBreed.YORK

            ),
            value: AnimalBreed.YORK
        },
        {
            label: translateEnum(
                AnimalBreedTranslate,
                AnimalBreed.OWCZAREK_NIEMIEKCI

            ),
            value: AnimalBreed.OWCZAREK_NIEMIEKCI
        },
        {
            label: translateEnum(
                AnimalBreedTranslate,
                AnimalBreed.MALTANCZYK

            ),
            value: AnimalBreed.MALTANCZYK
        }
    ]
    const selectColorItems = [
        {
            label: translateEnum(
                AnimalColorTranslate,
                AnimalColor.BROWN
            ),
            value: AnimalColor.BROWN
        },
        {
            label: translateEnum(
                AnimalColorTranslate,
                AnimalColor.BLACK
            ),
            value: AnimalColor.BLACK
        },
        {
            label: translateEnum(
                AnimalColorTranslate,
                AnimalColor.WHITE
            ),
            value: AnimalColor.WHITE
        }
        ]

    const selectHairItems = [
        {
            label: translateEnum(
                AnimalHairTranslate,
                AnimalHair.LONG
            ),
            value: AnimalHair.LONG
        },
        {
            label: translateEnum(
                AnimalHairTranslate,
                AnimalHair.MID
            ),
            value: AnimalHair.MID
        },
        {
            label: translateEnum(
                AnimalHairTranslate,
                AnimalHair.SHORTY
            ),
            value: AnimalHair.SHORTY
        }
        ]

    const selectSizeItems = [
        {
            label: translateEnum(
               AnimalSizeTranslate,
                AnimalSize.SMALL
            ),
            value: AnimalSize.SMALL
        },
        {
            label: translateEnum(
                AnimalSizeTranslate,
                AnimalSize.MEDIUM
            ),
            value: AnimalSize.MEDIUM
        },
        {
            label: translateEnum(
                AnimalSizeTranslate,
                AnimalSize.LARGE
            ),
            value: AnimalSize.LARGE
        }
        ]


    return <Box className={classes.CreateAnimalPanel}>
        <FormControl
            component="form"
            onSubmit={() => props.handleFormSubmit(formik.values)}
            className={classes.CreateAnimalForm}>
            <Stack className={classes.CreateAnimalStack}>
                <Box className={classes.CreateAnimalBox} sx={{
                    backgroundColor: theme.palette.createAnimal.panel.background,
                    border: `1px ${theme.palette.createAnimal.panel.border} solid`
                }}>
                    <Box className={classes.CreateAnimalHeader} sx={{
                        color: theme.palette.text.primary
                    }}>
                        {props.title}
                    </Box>
                    <Box className={classes.CreateAnimalContent} sx={{
                        borderTop: `1px ${theme.palette.createAnimal.panel.border} solid`
                    }}>
                        <Stack className={classes.FieldsStack}>
                            <AuthFormTextField
                                name="name"
                                label={t("forms.animalForm.fields.name")}
                                value={formik.values.name}
                                touched={formik.touched.name}
                                errorMessage={formik.errors.name}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                            />
                            <AuthFormTextField
                                name="age"
                                label={t("forms.animalForm.fields.age")}
                                value={formik.values.age}
                                touched={formik.touched.age}
                                errorMessage={formik.errors.age}
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
                            <SelectCheckboxField
                                items={formik.values.tags}
                                setItems={handleTagsChange}
                                selectPageSize={10}
                                searchOptionFieldName="name"
                                search={api.tag.search}
                                labelTranslation={t("forms.animalForm.fields.tags")}
                                noOptionsLabel={t("forms.animalForm.fields.noTagsLabel")}
                                errorMessage={Boolean(formik.touched.tags) ? formik.errors.tags as string : undefined}
                                handleBlur={formik.handleBlur}
                            />
                            <SelectTextField
                                label={t("forms.animalForm.fields.type")}
                                name="type"
                                value={formik.values.type}
                                handleChange={handleAnimalTypeChange}
                                items={selectTypeItems}
                            />
                            <SelectTextField
                                label={t("forms.animalForm.fields.breed")}
                                name="breed"
                                value={formik.values.breed}
                                handleChange={handleAnimalBreedChange}
                                items={selectBreedItems}
                            />
                            <SelectTextField
                                label={t("forms.animalForm.fields.color")}
                                name="color"
                                value={formik.values.color}
                                handleChange={handleAnimalColorChange}
                                items={selectColorItems}
                            />
                            <SelectTextField
                                label={t("forms.animalForm.fields.size")}
                                name="size"
                                value={formik.values.size}
                                handleChange={handleAnimalSizeChange}
                                items={selectSizeItems}
                            />
                            <SelectTextField
                                label={t("forms.animalForm.fields.hair")}
                                name="hair"
                                value={formik.values.hair}
                                handleChange={handleAnimalHairChange}
                                items={selectHairItems}
                            />
                            <AuthFormTextField
                                name="town"
                                label={t("forms.animalForm.fields.town")}
                                value={formik.values.town}
                                touched={formik.touched.town}
                                errorMessage={formik.errors.town}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                            />
                            <AuthFormTextField
                                name="contact"
                                label={t("forms.animalForm.fields.contact")}
                                value={formik.values.contact}
                                touched={formik.touched.contact}
                                errorMessage={formik.errors.contact}
                                handleChange={formik.handleChange}
                                handleBlur={formik.handleBlur}
                            />
                            <Stack className={classes.CreateAnimalButtonStack}>
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
                <Stack className={classes.AnimalHealthStack}>
                    {showAnswers && formik.values.healthBooklet.map((health, index) =>
                        <AnimalHealth
                            key={index}
                            index={index}
                            label={`${t("forms.animalForm.healthBooklet")}`}
                            sexFieldName={`healthBooklet.${index}.sex`}
                            healthFieldName={`healthBooklet.${index}.health`}
                            descriptionFieldName={`healthBooklet.${index}.description`}
                            handleChange={formik.handleChange}
                            handleCorrectness={handleHealth}
                            handleDelete={handleDeleteHealth}
                            handleBlur={formik.handleBlur}
                            values={formik.values.healthBooklet}
                            errorMessage={getHealthErrorMessage(index)}
                            touched={getHealthTouched(index)}
                         deletable/>
                    )}
                    {/*{showAnswers &&*/}
                    {/*    <AddAnimalButton handleClick={handleAddHealth}/>*/}
                    {/*}*/}
                </Stack>
            </Stack>
        </FormControl>
    </Box>
}