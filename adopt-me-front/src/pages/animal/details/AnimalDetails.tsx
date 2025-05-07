import Box from "@mui/material/Box"
import classes from "./AnimalDetails.module.css"
import {DetailsBox} from "../../../components/details-box/DetailsBox";
import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../../api";
import {RoutePath} from "../../../router/RoutePath";
import {SnackbarContext} from "../../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../../types/SnackbarType";
import reactModal from "@prezly/react-promise-modal";
import {CommonDialog} from "../../../components/dialog/common-dialog/CommonDialog";
import {asDate} from "../../../utils/format/FormatData";
import {EnumTranslateContext} from "../../../providers/enum-translate-provider/EnumTranslateProvider";
import {LoadingSpinner} from "../../../components/loading-spinner/LoadingSpinner";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {AnimalDto} from "../../../api/animal/response/AnimalDto";
import {AnimalTypeEnum} from "../../../api/animal/AnimalTypeEnum";
import {
    AnimalBreedTranslate,
    AnimalColorTranslate,
    AnimalHairTranslate,
    AnimalSizeTranslate,
    AnimalTypeTranslate
} from "../../../providers/enum-translate-provider/Translations";
import {UpdateAnimal} from "../update/UpdateAnimal";

export const AnimalDetails = () => {
    const {t} = useTranslation()
    const {id} = useParams()
    const navigate = useNavigate()
    const {showSnackbar} = useContext(SnackbarContext)
    const {translateEnum} = useContext(EnumTranslateContext)
    const [animal, setAnimal] = useState<AnimalDto>()
    const [loading, setLoading] = useState(true)
    const [update, setUpdate] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        if (id) {
            api.animal.getAnimalById(id!)
                .then(animal => {
                    setAnimal(animal)
                }).catch(() => {
            })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            navigate(RoutePath.ANIMAL)
        }
    }, [update])

    const handleDelete = async () => {
        const isConfirmed = await reactModal(({show, onSubmit, onDismiss}) => {
            return <CommonDialog
                open={show}
                title={t("pages.animalDetails.deleteDialog.title")}
                content={t("pages.animalDetails.deleteDialog.content")}
                submitButtonLabel={t("pages.animalDetails.deleteDialog.submitButtonLabel")}
                cancelButtonLabel={t("pages.animalDetails.deleteDialog.cancelButtonLabel")}
                handleSubmit={onSubmit}
                handleCancel={onDismiss}
                theme={theme}
            />
        })

        if (isConfirmed) {
            await api.animal.deleteAnimal(id!)
            navigate(RoutePath.ANIMAL)
            showSnackbar(
                t("snackbar.success.animalDeleted"),
                SnackbarType.SUCCESS
            )
        }
    }

    const handleUpdate = () => {
        setUpdate(!update)
    }

    return loading ?
        <LoadingSpinner/> :
        <Paper className={classes.AnimalDetailsPanel} elevation={0} sx={{
            backgroundColor: theme.palette.background.default
        }}>
            <Box className={classes.AnimalDetailsBox}>
                <Box className={update || animal!.type === AnimalTypeEnum.DOG ?
                    classes.DetailsBoxFullWidth :
                    classes.DetailsBox}>
                    <DetailsBox
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate}
                        updatingMode={update}
                        updateComponent={
                            <UpdateAnimal
                                handleUpdate={handleUpdate}
                                animal={animal!}
                            />}
                        title={t("pages.animalDetails.title")}
                        attachment={animal!.attachmentId ? {
                            label: t("pages.animalDetails.attachment"),
                            id: animal!.attachmentId
                        } : undefined}
                        updateTitle={t("pages.animalDetails.updateTitle")}
                        data={[
                            {
                                title: t("pages.animalDetails.primaryDataTitle"),
                                fields: [
                                    {
                                        label: t("pages.animalDetails.name"),
                                        value: [animal!.name]
                                    },
                                    {
                                        label: t("pages.animalBreed.breed"),
                                        value: [translateEnum(AnimalBreedTranslate, animal!.breed)],
                                        roundedBox: true
                                    },
                                    {
                                        label: t("pages.animalColor.color"),
                                        value: [translateEnum(AnimalColorTranslate, animal!.color)],
                                        roundedBox: true
                                    },
                                    {
                                        label: t("pages.animalDetails.type"),
                                        value: [translateEnum(AnimalTypeTranslate, animal!.type)],
                                        roundedBox: true
                                    },
                                    {
                                        label: t("pages.animalDetails.hair"),
                                        value: [translateEnum(AnimalHairTranslate, animal!.hair)],
                                        roundedBox: true
                                    },
                                    {
                                        label: t("pages.animalDetails.size"),
                                        value: [translateEnum(AnimalSizeTranslate, animal!.size)],
                                        roundedBox: true
                                    },
                                    {
                                        label: t("pages.animalDetails.tags"),
                                        dialogLabel: t("pages.animalDetails.tagsList") ?? "",
                                        value: animal!.tags.map(tag => tag.name),
                                        roundedBox: true
                                    }
                                ]
                            },
                            {
                                title: t("pages.animalDetails.metaDataTitle"),
                                fields: [
                                    {
                                        label: t("pages.animalDetails.createdOn"),
                                        value: [asDate(animal!.createdOn)]
                                    },
                                    {
                                        label: t("pages.animalDetails.updatedOn"),
                                        value: [asDate(animal!.updatedOn)]
                                    }
                                ]
                            }]}
                    />
                {/*</Box>*/}
                {/*{!update && animal!.healthBooklet && animal!.healthBooklet.length > 0 &&*/}
                {/*    <Box className={classes.HealthBooklet}>*/}
                {/*        {animal!.healthBooklet.map((healthBooklet, index) =>*/}
                {/*            <AnswerDetails*/}
                {/*                key={index}*/}
                {/*                index={index}*/}
                {/*                description={option.content}*/}
                {/*                correct={option.correct}*/}
                {/*            />*/}
                {/*        )}*/}
                {/*    </Box>}*/}
                </Box>
            </Box>
        </Paper>
}