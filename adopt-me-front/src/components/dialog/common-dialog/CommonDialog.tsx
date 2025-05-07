import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import classes from "./CommonDialog.module.css";
import {ColorType} from "../../../types/ColorType";
import {Theme, useTheme} from "@mui/material/styles";

interface CommonDialogProps {
    open: boolean
    title: string
    content: string
    submitButtonLabel: string
    cancelButtonLabel: string
    handleSubmit: () => void
    handleCancel: () => void
    theme: Theme
}

export const CommonDialog = (props: CommonDialogProps) => {
    const theme = props.theme
    return <Dialog
        PaperProps={{
            className: classes.Dialog,
            sx:{
                backgroundColor: `${theme.palette.paper.secondary} !important`
            }
        }}
        open={props.open}>
        <DialogTitle
            className={classes.DialogTitle} sx={{
            color: theme.palette.text.primary
        }}>
            {props.title}
        </DialogTitle>
        <DialogContent
            className={classes.DialogContent}  sx={{
            color: theme.palette.text.secondary
        }}>
            {props.content}
        </DialogContent>
        <DialogActions>
            <Button className={classes.DialogCancelButton}
                    color="error"
                    onClick={props.handleCancel}>
                {props.cancelButtonLabel}
            </Button>
            <Button
                className={classes.DialogSubmitButton}
                variant="contained"
                color={ColorType.PRIMARY}
                onClick={props.handleSubmit}
            >
                {props.submitButtonLabel}
            </Button>
        </DialogActions>
    </Dialog>
}