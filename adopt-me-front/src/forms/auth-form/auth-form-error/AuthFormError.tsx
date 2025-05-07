import {Typography} from "@mui/material";
import classes from "./AuthFormError.module.css"

interface AuthFormErrorProps {
    message?: string
}

export const AuthFormError = ({message}: AuthFormErrorProps) => {
    if(message) {
        return <Typography className={classes.AuthFormError}>
            {message}
        </Typography>
    }
    return <></>
}