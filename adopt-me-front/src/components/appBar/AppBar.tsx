import React, {useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ToggleColorMode from "../colorMode/ColorMode";
import Box from "@mui/material/Box";
import logo from "../../assets/images/adopt-logo.png";
import classes from "./AppBar.module.css";
import {ChangeLanguageButton} from "../button/change-language-button/ChangeLanguageButton";
import {HamburgerIcon} from "../icons/HamburgerIcon";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    })
}));

const drawerWidth = 240;

interface CustomAppBarProps {
    handleDrawerClick?: () => void
    TopRightElement: JSX.Element
}

const CustomAppBar = ({handleDrawerClick, TopRightElement}: CustomAppBarProps) => {
    const theme = useTheme();
    const [mouseOverMenuButton, setMouseOverMenuButton] = useState(false)

    return (
        <AppBar className={classes.AppBar} position="fixed" elevation={0}>
            <Toolbar sx={{
                backgroundColor: theme.palette.background.default
            }} className={classes.CustomToolbar} disableGutters>
                <Box className={classes.BoxForTypographies}>
                    <Box className={classes.BoxForLogoAndTitle}>
                        <img src={logo} alt="Logo" className={classes.scaledLogoImage}/>
                        <Typography
                            className={classes.TitleTypography}
                            sx={{
                                color: theme.palette.text.primary
                            }}
                            noWrap
                            component="a"
                            href="/">
                            <h3 style={{letterSpacing: "0", marginLeft: "20px"}}>ADOPT ME</h3>
                        </Typography>
                    </Box>
                    {handleDrawerClick &&
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerClick}
                            edge="start"
                            onMouseOver={() => setMouseOverMenuButton(true)}
                            onMouseOut={() => setMouseOverMenuButton(false)}
                            sx={{
                                backgroundColor: theme.palette.menuIcon.background,
                                ":hover": {
                                    backgroundColor: theme.palette.menuIcon.backgroundHover
                                }
                            }}
                            className={classes.OpenDrawerIconButton}
                        >
                            <HamburgerIcon active={mouseOverMenuButton}/>
                        </IconButton>
                    }
                </Box>
                <Box className={classes.BoxForToolbarSpacing}></Box>
                <Box>
                    <ToggleColorMode/>
                </Box>
                <ChangeLanguageButton/>
                {TopRightElement}
            </Toolbar>
        </AppBar>
    );
};
export default CustomAppBar;