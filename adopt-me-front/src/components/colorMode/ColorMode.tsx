import * as React from 'react';
import {useContext, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import {ColorModeContext} from "../../providers/color-mode-provider/ColorModeProvider";
import {useTheme} from "@mui/material/styles";
import {ColorModeIcon} from "../icons/ColorModeIcon";
import classes from "./ColorMode.module.css"


export default function ToggleColorMode() {
    const {toggleColorMode} = useContext(ColorModeContext)
    const [mouseOver, setMouseOver] = useState(false)
    const theme = useTheme()
    const handleColorModeChange = () => {
        const prevMode = localStorage.getItem('colorMode')
        localStorage.setItem('colorMode', (prevMode && prevMode === 'dark') ? 'light' : 'dark')
        toggleColorMode()
    }

    return (
        <IconButton
            sx={{
                backgroundColor: theme.palette.colorModeIcon.background,
                ":hover": {
                    backgroundColor: theme.palette.colorModeIcon.backgroundHover
                }
            }}
            className={classes.iconButton}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
            onClick={() => handleColorModeChange()}
        >
            <ColorModeIcon mode={theme.palette.mode} isMouseOver={mouseOver}/>
        </IconButton>
    );
}