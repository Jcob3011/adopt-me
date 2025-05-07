import React from "react";
import {Link} from "react-router-dom";
import classes from "./AuthFormBottomLink.module.css";
import {Divider, Stack, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

interface AuthFormBottomLinkProps {
    path: string
    label: string
}

export const AuthFormBottomLink = ({path, label}: AuthFormBottomLinkProps) => {
    const theme = useTheme()
    return <>
        <Divider style={{
            borderColor: theme.palette.divider,
            marginTop: 20,
            marginBottom: 5
        }}/>
        <Stack alignItems="center">
            <Link to={path}
                  color="primary"
                  className={classes.AuthFormBottomLink}>
                <Typography className={classes.AuthFormBottomLink}>
                    {label}
                </Typography>
            </Link>
        </Stack>
    </>
}