import classes from "./ListDialog.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import React from "react";
import {Theme, useTheme} from "@mui/material/styles";

interface ListDialogProps {
    open: boolean
    title: string
    items: (string | number | Date)[]
    cancelButtonLabel: string
    handleCancel: () => void
    theme: Theme
}

export const ListDialog = (props: ListDialogProps) => {
    const theme = props.theme

    return <Dialog
        PaperProps={{
            sx: {
                color: theme.palette.text.primary,
                backgroundColor: `${theme.palette.background.default} !important`
            },
            className: classes.ListDialog
        }}
        open={props.open}>
        <DialogTitle
            className={classes.ListDialogTitle} sx={{
            color: theme.palette.text.primary
        }}>
            {props.title}
        </DialogTitle>
        <DialogContent
            className={classes.ListDialogContent} sx={{
            color: theme.palette.text.primary
        }}>
            {props.items.map(item =>
                <li
                    key={item.toString()}
                    className={classes.ListDialogItem}>
                    {item.toString()}
                </li>
            )}
        </DialogContent>
        <DialogActions>
            <Button className={classes.ListDialogCancelButton}
                    color="error"
                    onClick={props.handleCancel}>
                {props.cancelButtonLabel}
            </Button>
        </DialogActions>
    </Dialog>
}