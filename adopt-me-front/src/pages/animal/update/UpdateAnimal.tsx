import {useTranslation} from "react-i18next";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../../types/SnackbarType";
import {api} from "../../../api";
import {LoadingSpinner} from "../../../components/loading-spinner/LoadingSpinner";
import {AnimalDto} from "../../../api/animal/response/AnimalDto";
import {Animal, AnimalForm} from "../../../forms/animal-form/AnimalForm";


interface UpdateAnimalProps {
    animal: AnimalDto,
    handleUpdate: (update: boolean) => void
}

export const UpdateAnimal = ({animal, handleUpdate}: UpdateAnimalProps) => {
    const {t} = useTranslation()
    const {showSnackbar} = useContext(SnackbarContext)
    const [loading, setLoading] = useState(true)
    const [attachment, setAttachment] = useState<File | null>(null)

    useEffect(() => {
        if (animal.attachmentId) {
            api.attachment.download(animal.attachmentId).then((blobAttachment) => {
                const attachment = new File([blobAttachment],
                    t("pages.updateAnimal.currentAttachment"))
                setAttachment(attachment)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    const initialValues = {
        name: animal.name,
        age: animal.age,
        attachment: attachment,
        tags: animal.tags.map(tag => tag.name),
        breed: animal.breed,
        color: animal.color,
        hair: animal.hair,
        size: animal.size,
        type: animal.type,
        town: animal.town,
        contact: animal.contact,
        optionsToDelete: [],
        healthBooklet: animal.healthBooklet ? animal.healthBooklet.map(healthBooklet => {
            return {
                id: healthBooklet.id,
                sex: healthBooklet.sex,
                health: healthBooklet.health,
                description: healthBooklet.description
            }
        }) : []
    }

    const handleFormSubmit = async (values: Animal) => {

        setLoading(true)
        let attachmentId = animal.attachmentId
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

        api.animal.updateAnimal({
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
            healthBooklet: values.healthBooklet,
            optionsToDelete: values.optionsToDelete
        }, animal.id).then(() => {
            handleUpdate(false)
            showSnackbar(
                t("snackbar.success.animalUpdated"),
                SnackbarType.SUCCESS
            )
        }).catch(() => {})
            .finally(() => setLoading(false))
    }

    return loading ?
        <LoadingSpinner/> :
        <AnimalForm
            updateForm
            title={t("pages.updateAnimal.title")}
            submitButtonLabel={t("forms.animalForm.updateAnimalButtonLabel")}
            cancelButtonLabel={t("pages.updateAnimal.cancelButtonLabel")}
            loading={loading}
            initialValues={initialValues}
            handleFormSubmit={handleFormSubmit}
        />
}