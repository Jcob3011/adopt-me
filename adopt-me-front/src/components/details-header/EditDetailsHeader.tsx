import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import classes from "./DetailsHeader.module.css"
import {ModuleItemMode} from "../../types/ModuleItemMode";
import {useTranslation} from "react-i18next";
import {Dispatch, SetStateAction} from "react";

type Props = {
    mode: ModuleItemMode
    setMode: Dispatch<SetStateAction<ModuleItemMode>>
    display?: boolean
    pauseActions?: boolean
    disableEdit?: boolean
    disableDelete?: boolean
    onDelete: () => void
}

export const EditDetailsHeader = ({
                                      display,
                                      mode,
                                      setMode,
                                      pauseActions,
                                      disableEdit,
                                      disableDelete,
                                      onDelete
                                  }: Props) => {
    const {t} = useTranslation()

    return (
        <>
            {display &&
                <Box className={classes.outerBox}>
                    <Box className={classes.buttonBox}>
                        {mode === 'details' &&
                            <Button variant='text' color='info' onClick={() => setMode('edit')} disabled={pauseActions || disableEdit}>
                                {t('components.editDetailsHeader.edit')}
                            </Button>}
                        {mode === 'edit' &&
                            <Button variant='text' color='info' onClick={() => setMode('details')} disabled={pauseActions}>
                                {t('components.editDetailsHeader.closeEdit')}
                            </Button>}
                        <Button color='error' variant='text' onClick={() => onDelete()} disabled={pauseActions || disableDelete}>
                            {t('components.editDetailsHeader.delete')}
                        </Button>
                    </Box>
                </Box>
            }
        </>
    )
}