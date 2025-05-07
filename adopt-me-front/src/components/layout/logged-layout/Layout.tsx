import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import CustomAppBar from "../../appBar/AppBar";
import CustomDrawer from "../../drawer/Drawer"
import {RoutePath} from "../../../router/RoutePath";
import {MainContainer} from "./MainContainer";
import classes from "./Layout.module.css";
import TopRightMenu from "../../appBar/top-right-element/logged-menu/TopRightMenu";
import {useTheme} from "@mui/material/styles";

export interface IMenuItem {
    sectionName: string,
    options: {
        label: string,
        icon: JSX.Element,
        path: RoutePath | undefined,
        subMenu: { label: string, icon?: JSX.Element, path: RoutePath | undefined }[]
    }[]
}

export interface ITopRightMenuItem {
    settings: {
        label: string,
        icon: JSX.Element,
        path: string,
    }[]
}

interface LayoutProps {
    menuItems: IMenuItem[]
    topRightMenuItems: ITopRightMenuItem
    children: React.ReactNode
}

export default function Layout({menuItems, topRightMenuItems, children}: LayoutProps) {
    const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true);
    const theme = useTheme()
    return (
        <>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <CustomAppBar TopRightElement={<TopRightMenu topRightMenuItems={topRightMenuItems}/>}
                              handleDrawerClick={() => setDrawerOpen(prevState => !prevState)}
                ></CustomAppBar>
                <CustomDrawer menuItems={menuItems!} open={drawerOpen}></CustomDrawer>
                <Box className={classes.layoutContainer}
                     style={{
                         backgroundColor: theme.palette.paper.main
                     }}
                     component="main">
                    {children}
                    <MainContainer/>
                </Box>
            </Box>
        </>
    );
}