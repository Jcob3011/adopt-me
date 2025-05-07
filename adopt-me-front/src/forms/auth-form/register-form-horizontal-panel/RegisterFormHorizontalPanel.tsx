import {Stack} from "@mui/material";
import React, {ReactNode} from "react";
import classes from "./RegisterFormHorizontalPanel.module.css";

interface RegisterFormHorizontalPanelProps {
    children: ReactNode
}

export const RegisterFormHorizontalPanel = ({children}: RegisterFormHorizontalPanelProps) => {
    return <Stack className={classes.RegisterFormHorizontalPanel}>
        {children}
    </Stack>
}