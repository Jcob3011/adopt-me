import React, {useState} from "react";
import {Box, Button} from "@mui/material";
import classes from "./CommonButton.module.css";
import {ColorType} from "../../../types/ColorType";

interface CommonButtonProps {
    disabled?: boolean
    animated?: boolean
    type?: "button" | "submit"
    icon?: string
    label: string
    variant?: "text" | "contained" | "outlined"
    color?: ColorType
    hoverColor?: string
    handleClick?: () => void
}

export const CommonButton = ({
                                 icon,
                                 label,
                                 disabled = false,
                                 animated = false,
                                 type = "button",
                                 variant = "contained",
                                 color = ColorType.PRIMARY,
                                 handleClick,
                                 hoverColor
                             }: CommonButtonProps) => {

    const [animate, setAnimate] = useState(false)
    const handleMouseDown = () => {
        setAnimate(true)
    }

    const handleMouseUp = () => {
        setAnimate(false)
    }

    return <Button
        variant={variant}
        color={color}
        type={type}
        size="medium"
        onMouseDownCapture={handleMouseDown}
        onMouseOutCapture={handleMouseUp}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        disabled={disabled}
        className={disabled ?
            classes.CommonButtonDisabled : animated ?
                animate ?
                    classes.CommonButtonAnimated :
                    classes.CommonButton :
                classes.CommonButton
        }
        sx={hoverColor ?
            {":hover":
                    {backgroundColor: hoverColor}
            } : {}}
        startIcon={icon &&
            <Box className={classes.CommonButtonIcon}>
                <img
                    src={icon}
                    alt="button icon"
                />
            </Box>}>
        {label}
    </Button>
}