import * as React from "react";
import {Box, Typography} from "@mui/material";
import classes from "./DeleteDialog.module.css"

type Props = {
    text: string
}

export const DeleteDialog = ({text}: Props) => {
    return (
        <Box className={classes.box}>
            <Typography className={classes.text}>
                {text}
            </Typography>
        </Box>
    )
}