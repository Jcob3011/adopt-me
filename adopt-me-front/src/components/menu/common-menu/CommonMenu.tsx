import {Menu, MenuItem, Typography} from "@mui/material"
import classes from "./CommonMenu.module.css"
import React from "react";
import {useTheme} from "@mui/material/styles";

interface CommonMenuProps {
    anchorEl: HTMLElement | null
    menuId: string
    open: boolean
    verticalPosition: "center" | "top" | "bottom",
    horizontalPosition: "center" | "left" | "right"
    handleClose: () => void
    items: {
        label: string
        labelTranslation: string
        selected: boolean
        handleClick: () => void
    }[]
}

export const CommonMenu = (props: CommonMenuProps) => {
    const theme = useTheme()
    return <Menu
        keepMounted
        id={props.menuId}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        PaperProps={{
            className: classes.CommonMenu,
            sx: {
                backgroundColor: theme.palette.background.default
            }
        }}
        anchorOrigin={{
            vertical: props.verticalPosition,
            horizontal: props.horizontalPosition,
        }}
        transformOrigin={{
            vertical: props.verticalPosition,
            horizontal: props.horizontalPosition,
        }}>
        {props.items.map(item =>
            <MenuItem
                selected={item.selected}
                className={classes.MenuItem}
                classes={{
                    selected: classes.MenuItemSelected,
                }}
                key={item.label}
                onClick={() => {
                    item.handleClick()
                    props.handleClose()
                }}>
                <Typography className={classes.LanguageLabel}>
                    {item.label}
                </Typography>
                <Typography className={classes.LanguageTranslationLabel}>
                    {`(${item.labelTranslation})`}
                </Typography>
            </MenuItem>)}
    </Menu>
}