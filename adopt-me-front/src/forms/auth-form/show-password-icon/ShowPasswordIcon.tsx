import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React from "react";

interface ShowPasswordIconProps {
    showIcon: boolean
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

export const ShowPasswordIcon = (props: ShowPasswordIconProps) => {
    return <InputAdornment position="end">
        <IconButton edge="end" onClick={props.handleClick}>
            {props.showIcon ? <Visibility/> : <VisibilityOff/>}
        </IconButton>
    </InputAdornment>
}