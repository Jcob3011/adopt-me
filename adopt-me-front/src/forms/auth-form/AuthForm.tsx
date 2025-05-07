import {Box, FormControl, Link, Stack, Typography} from "@mui/material";
import React from "react";
import logo from "../../assets/images/adopt-logo.png";
import classes from "./AuthForm.module.css";

interface AuthFormProps {
    children: React.ReactNode
    title: string
    subtitle: string
    subtitle2?: string
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const AuthForm = (props: AuthFormProps) => {

    return <Stack className={classes.AuthFormBackground}>
        <Box className={classes.FlexboxPositionBox}></Box>
        <Box className={classes.AuthFormBox}>
            <Box className={classes.AuthForm}>
                <Box className={classes.AdoptLogo}>
                    <img src={logo} alt="adopt me logo"/>
                </Box>
                <Typography className={classes.AuthFormTitle}>
                    {props.title}
                </Typography>
                <Typography className={classes.AuthFormSubtitle}>
                    {props.subtitle}
                </Typography>
                {props.subtitle2 &&
                    <Typography className={classes.AuthFormSubtitle2}>
                        {props.subtitle2}
                    </Typography>
                }
                <FormControl
                    component="form"
                    onSubmit={props.handleSubmit}
                    className={classes.AuthFormControl}>
                    <Stack spacing={2}>
                        {props.children}
                    </Stack>
                </FormControl>
            </Box>
        </Box>
    </Stack>
}