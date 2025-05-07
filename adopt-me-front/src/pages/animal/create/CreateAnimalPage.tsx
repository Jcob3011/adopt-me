import * as React from "react";
import {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import classes from "./CreateAnimalPage.module.css";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {api} from "../../../api";
import {SnackbarType} from "../../../types/SnackbarType";
import {RoutePath} from "../../../router/RoutePath";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {AnimalType} from "../enum/AnimalType";
import {AnimalBreed} from "../enum/AnimalBreed";
import {AnimalColor} from "../enum/AnimalColor";
import {AnimalHair} from "../enum/AnimalHair";
import {AnimalSize} from "../enum/AnimalSize";
import {Animal, AnimalForm} from "../../../forms/animal-form/AnimalForm";

export const CreateAnimalPage = () => {
    const {t} = useTranslation()
    const theme = useTheme()
    const navigate = useNavigate()
    const {showSnackbar} = useContext(SnackbarContext)
    const [loading, setLoading] = useState(false)

    const initialValues = {
        name: "",
        age: "",
        attachment: null,
        type: AnimalType.DOG,
        breed: AnimalBreed.YORK,
        color: AnimalColor.WHITE,
        hair: AnimalHair.MID,
        size: AnimalSize.SMALL,
        tags: [],
        healthBooklet:[
            {
                sex: "",
                health: true,
                description: "",
            }
        ],
        town: "",
        contact: " "
    }

    const handleFormSubmit = async (values: Animal) => {
        //const healthBooklet = values.healthBooklet.filter(healthBooklet => healthBooklet.health).length

        setLoading(true)
        let attachmentId
        if (values.attachment) {
            const attachment = await api.attachment.save(
                "animal picture",
                "animal picture",
                values.attachment
            )
            attachmentId = attachment.id
        } else {
            attachmentId = undefined
        }

        api.animal.saveAnimal({
            name:values.name,
            age: values.age,
            attachmentId: attachmentId,
            type: values.type,
            breed: values.breed,
            color: values.color,
            hair: values.hair,
            size: values.size,
            tags: values.tags,
            town: values.town,
            contact: values.contact,
            healthBooklet: values.healthBooklet
        }).then(() => {
            navigate(RoutePath.ANIMAL)
            showSnackbar(
                t("snackbar.success.animalCreated"),
                SnackbarType.SUCCESS)
        }).catch(() => {})
            .finally(() => setLoading(false))
    }

    return <Box className={classes.CreateAnimalPanel}  sx={{
        backgroundColor: theme.palette.background.default
    }}>
        <AnimalForm
            updateForm={false}
            loading={loading}
            initialValues={initialValues}
            handleFormSubmit={handleFormSubmit}
            title={t("pages.createAnimal.title")}
            submitButtonLabel={t("forms.animalForm.createAnimalButtonLabel")}
            cancelButtonLabel={t("pages.createAnimal.clearFormButtonLabel")}></AnimalForm>
    </Box>
}