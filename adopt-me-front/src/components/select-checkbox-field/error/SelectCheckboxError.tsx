import Typography from "@mui/material/Typography"
import classes from "./SelectCheckboxError.module.css"

interface SelectCheckboxError {
    message?: string | never[] | string[]
}

export const SelectCheckboxError = ({message}: SelectCheckboxError) => {
    return <Typography className={classes.SelectCheckboxError}>
        {message}
    </Typography>
}