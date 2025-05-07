import {Alert} from "@mui/material";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import React from "react";
import classes from "./CommonSnackbar.module.css";
import {SnackbarType} from "../../types/SnackbarType";

const snackbarDisplayTimeInMs = 2000

interface CommonSnackbarProps {
    opened: boolean
    message: string
    type: SnackbarType
    handleHideSnackbar: () => void
}

export const CommonSnackbar = (props: CommonSnackbarProps) => {
    return <Snackbar
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}
        open={props.opened}
        className={classes.CommonSnackbar}
        autoHideDuration={snackbarDisplayTimeInMs}
        onClose={props.handleHideSnackbar}>
        <Alert
            severity={props.type}
            className={props.type === SnackbarType.SUCCESS ?
                classes.SuccessSnackbar :
                classes.ErrorSnackbar}>
            {props.message}
        </Alert>
    </Snackbar>
}