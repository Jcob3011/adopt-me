import {Stack} from "@mui/material";
import React, {ReactNode} from "react";
import classes from "./LoginFormHorizontalPanel.module.css";

interface LoginFormHorizontalPanelProps {
    children: ReactNode
}

export const LoginFormHorizontalPanel = ({children}: LoginFormHorizontalPanelProps) => {
    return <Stack className={classes.LoginFormHorizontalPanel}>
        {children}
    </Stack>
}