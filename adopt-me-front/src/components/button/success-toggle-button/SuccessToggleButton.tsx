import {Button} from "@mui/material";
import classes from "./SuccessToggleButton.module.css"

interface SuccessToggleButtonProps {
    success: boolean
    successLabel: string
    errorLabel: string
    handleClick?: () => void
}

export const SuccessToggleButton = (props: SuccessToggleButtonProps) => {
    return <Button
        className={props.success ?
            classes.SuccessToggleButton :
            classes.ErrorToggleButton}
        disabled={Boolean(!props.handleClick)}
        onClick={props.handleClick}>
        {props.success ?
            props.successLabel :
            props.errorLabel}
    </Button>
}