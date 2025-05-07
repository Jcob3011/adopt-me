import classes from "./ChangeLanguageButton.module.css"
import React, {useState} from "react";
import Box from "@mui/material/Box";
import {LanguageIcon} from "../../icons/LanguageIcon";
import {ChangeLanguageMenu} from "../../menu/change-language-menu/ChangeLanguageMenu";
import {useTheme} from "@mui/material/styles";

export const ChangeLanguageButton = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [mouseOver, setMouseOver] = useState(false)
    const theme = useTheme()
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    return <Box
        className={classes.ChangeLanguageButtonBox}>
        <Box
            component="button"
            sx={mouseOver ? {
                backgroundColor: theme.palette.languageIcon.backgroundHover
            } : {
                backgroundColor: theme.palette.languageIcon.background
            }}
            className={mouseOver ?
                classes.ChangeLanguageButtonActive :
                classes.ChangeLanguageButton}
            onClick={handleClick}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}>
            <LanguageIcon isMouseOver={mouseOver}/>
        </Box>
        <ChangeLanguageMenu
            open={open}
            anchorEl={anchorEl}
            handleCloseMenu={handleCloseMenu}
        />
    </Box>
}