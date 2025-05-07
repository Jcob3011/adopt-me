import * as React from "react";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {AuthFormTextField} from "../../../../forms/auth-form/auth-form-text-field/AuthFormTextField";
import Stack from "@mui/system/Stack";
import {useTheme} from "@mui/material/styles";
import {SuccessToggleButton} from "../../../../components/button/success-toggle-button/SuccessToggleButton";
import {DeleteHealthButton} from "./button/delete-health-button/DeleteHealthButton";
import classes from "./HealthBooklet.module.css";

interface HealthBookletProps {
    label: string
    index: number
    sexFieldName: string
    healthFieldName: string
    descriptionFieldName: string
    deletable: boolean
    values: { sex: string, health: boolean, description: string }[]
    handleChange: (e: React.ChangeEvent<any>) => void
    handleCorrectness: (index: number, correct: boolean) => void
    handleDelete: (index: number) => void
    handleBlur: (e: React.ChangeEvent<any>) => void
    errorMessage: string | undefined
    touched: boolean
}

export const AnimalHealth = (props: HealthBookletProps) => {
    const {t} = useTranslation()
    const theme = useTheme()

    const handleHealth = () => {
        props.handleCorrectness(props.index, !props.values[props.index].health)
    }

    const handleDeleteHealth = () => {
        props.handleDelete(props.index)
    }

    return <Box className={classes.HealthBooklet} sx={{
        backgroundColor: theme.palette.createAnimal.panel.background,
        border: `1px ${theme.palette.createAnimal.panel.border} solid`
    }}>
        <Box className={classes.HealthBookletHeader}>
            {props.label}
            <Stack className={classes.HealthBookletButtons}>
                <SuccessToggleButton
                    success={props.values[props.index].health}
                    handleClick={handleHealth}
                    successLabel={t("pages.createAnimals.correctHealthButtonLabel")}
                    errorLabel={t("pages.createAnimal.wrongHealthButtonLabel")}
                />
                {/*{props.deletable &&*/}
                {/*    <DeleteHealthButton*/}
                {/*        key={props.index}*/}
                {/*        handleClick={handleDeleteHealth}*/}
                {/*    />}*/}
            </Stack>
        </Box>

        <Box className={classes.AnimalHealthDescription} sx={{
            borderTop: `1px solid ${theme.palette.createAnimal.panel.border} !important`
        }}>
            <AuthFormTextField
                name={props.descriptionFieldName}
                label={t("pages.createAnimal.fields.description")}
                value={props.values[props.index].description}
                touched={Boolean(props.touched)}
                errorMessage={props.errorMessage}
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
            />
            <AuthFormTextField
                name={props.sexFieldName}
                label={t("pages.createAnimal.fields.sex")}
                value={props.values[props.index].sex}
                touched={Boolean(props.touched)}
                errorMessage={props.errorMessage}
                handleChange={props.handleChange}
                handleBlur={props.handleBlur}
            />
        </Box>
    </Box>
}