import {Box, CircularProgress} from "@mui/material";
import classes from "./LoadingSpinner.module.css";
import React from "react";
import { ColorType } from "../../types/ColorType";

interface LoadingSpinnerProps {
    entireScreen?: boolean
}

export const LoadingSpinner = ({entireScreen = false}: LoadingSpinnerProps) => {
    return <Box className={entireScreen ?
        classes.EntireScreenLoadingSpinner :
        classes.LoadingSpinner}>
        <CircularProgress color={ColorType.SECONDARY}/>
    </Box>
}