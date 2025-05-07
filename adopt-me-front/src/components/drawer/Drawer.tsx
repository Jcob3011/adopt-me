import * as React from 'react';
import {useEffect} from 'react';
import {CSSObject, styled, Theme, useTheme} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Box, Collapse, ListSubheader, Typography} from '@mui/material';
import List from "@mui/material/List";
import {RoutePath} from "../../router/RoutePath";
import classes from "./Drawer.module.css";
import {useNavigate} from "react-router-dom";
import {ArrowUpIcon} from "../icons/ArrowUpIcon";
import {ArrowDownIcon} from "../icons/ArrowDownIcon";
import {PointerIcon} from "../icons/PointerIcon";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.background.default,
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface CustomDrawerProps {
    open: boolean,
    menuItems: {
        sectionName: string,
        options: {
            label: string,
            icon: JSX.Element,
            path?: RoutePath,
            subMenu: {
                label: string,
                icon?: JSX.Element,
                path?: RoutePath
            }[]
        }[]
    }[]
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
                                                       open,
                                                       menuItems
                                                   }) => {
    const theme = useTheme()
    useEffect(() => {
        if (!open) {
            setOpenList([]);
        }
    }, [open]);
    const [openList, setOpenList] = React.useState<string[]>([]);
    const [activeMenu, setActiveMenu] = React.useState<string>("");
    const navigate = useNavigate();

    const handleDrawerClose = () => {
        setOpenList([]);
    };
    const handleSubListClick = (index: string) => {
        if (!open) return;
        setOpenList(prevState =>
            prevState.includes(index) ? prevState.filter(item => item !== index) : [...prevState, index]
        );
    }
    const handleListClick = (index: string) => {
        if (!open) return;
        setOpenList(prevState => prevState.includes(index) ? prevState.filter(item => item !== index) : [...prevState, index])
    };
    const prepareMenuUniqueName = (sectionIndex: number, menuIndex: string, subMenuIndex?: number): string => {
        let indexString = `${sectionIndex}${menuIndex}`
        if (subMenuIndex !== undefined) {
            indexString += subMenuIndex
        }
        return indexString
    }
    const handleClick = (sectionIndex: number, optionIndex: string, path: RoutePath | undefined) => {
        if (path !== undefined) {
            navigate(path);
        }
    };
    return (
        <>
            <Drawer variant="permanent" open={open} PaperProps={{
                sx: {
                    border: "none !important"
                }
            }}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <List className={classes.MainList} component="nav">
                    {menuItems.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            {open && (
                                <ListSubheader
                                    sx={{
                                        backgroundColor: theme.palette.background.default,
                                        color: theme.palette.text.secondary
                                    }}
                                    className={classes.MainListSubheader}>{section.sectionName}</ListSubheader>
                            )}
                            {section.options.map((option, optionIndex) => (
                                <div key={option.label}>
                                    <ListItemButton onClick={() => {
                                        if (option.subMenu.length > 0) {
                                            handleSubListClick(option.label)
                                        }
                                        handleClick(sectionIndex, option.label, option.path)
                                        setActiveMenu(prepareMenuUniqueName(sectionIndex, option.label))
                                    }}
                                                    selected={prepareMenuUniqueName(sectionIndex, option.label) === activeMenu}
                                                    key={`${sectionIndex}-${optionIndex}`}
                                                    className={open ? classes.MainListItemButton : classes.MainListItemButtonClosed}>
                                        <ListItemIcon className={classes.MainListItemIcon}>
                                            {option.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography className={classes.DrawerItemLabel} sx={{
                                                color: theme.palette.text.secondary
                                            }}>
                                                {option.label}
                                            </Typography>
                                        } className={open ? classes.DrawerItemLabel : classes.DrawerItemLabelClosed}/>
                                        <Box className={open ? classes.ItemListIconBox : classes.ItemListIconBoxClosed}>
                                            {option.subMenu.length > 0 && (
                                                openList.includes(option.label) ? <ArrowUpIcon/> : <ArrowDownIcon/>
                                            )}
                                        </Box>
                                    </ListItemButton>
                                    {option.subMenu.length > 0 && (
                                        <Collapse in={openList.includes(option.label)} timeout="auto" unmountOnExit>
                                            <List>
                                                {option.subMenu.map(({label, path}, subOptionIndex) => (
                                                    <ListItemButton
                                                        key={`${sectionIndex}-${optionIndex}-${subOptionIndex}`}
                                                        selected={prepareMenuUniqueName(sectionIndex, option.label, subOptionIndex) === activeMenu}
                                                        onClick={() => {
                                                            setActiveMenu(prepareMenuUniqueName(sectionIndex, option.label, subOptionIndex))
                                                            handleListClick(prepareMenuUniqueName(sectionIndex, option.label, subOptionIndex))
                                                            handleClick(sectionIndex, option.label, path)
                                                        }}
                                                        className={classes.SubListItemButton}>
                                                        <ListItemIcon>
                                                            <PointerIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={
                                                            <Typography className={classes.DrawerItemSubLabel} color={theme.palette.text.secondary}>
                                                                {label}
                                                            </Typography>
                                                        }/>
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    )}
                                </div>
                            ))}
                            {open && <Divider color={theme.palette.divider} className={classes.DrawerDivider}/>}
                        </div>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
export default CustomDrawer