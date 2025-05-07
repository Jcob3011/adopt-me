import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import classes from "./TagDeleteDialog.module.css";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";

function PaperComponent(props: PaperProps) {
    const theme = useTheme()
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper sx={{
                backgroundColor: theme.palette.background.default
            }} {...props} />
        </Draggable>
    );
}
interface DialogProps {
    open: boolean
    handleClose: React.Dispatch<React.SetStateAction<boolean>>
    handleDelete: () => void
}

export const TagDeleteDialog = ({open, handleClose, handleDelete}: DialogProps) => {
    const {t} = useTranslation()

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle className={classes.DialogTitle} id="draggable-dialog-title">
                    {t('pages.tagDetailsPage.tagDeleteDialog.delete')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.DialogContentText}>
                        {t('pages.tagDetailsPage.tagDeleteDialog.sure')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleClose(false)}>
                        {t('pages.tagDetailsPage.tagDeleteDialog.cancel')}
                    </Button>
                    <Button onClick={() => {
                        handleDelete()
                        handleClose(false)
                    }} color={"error"}>
                        {t('pages.tagDetailsPage.tagDeleteDialog.delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}