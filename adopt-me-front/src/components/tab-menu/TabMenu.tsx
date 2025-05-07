import * as React from "react";
import {ReactElement, ReactNode, useEffect, useState} from "react";
import {Divider, Paper, Tab, Typography} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import classes from "./TabMenu.module.css";
import {useTheme} from "@mui/material/styles";

interface TabMenuProps {
    menu: {
        label: string
        icon: ReactElement
        activeIcon: ReactElement
        component: ReactNode
        disableMargin?: boolean
    }[],
    collapseWidth?: number
    disablePadding?: boolean
}

export const TabMenu = (props: TabMenuProps) => {
    const theme = useTheme()
    const [value, setValue] = useState("0")
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        };
        handleResize()
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return <Paper
        className={classes.TabMenu}
        elevation={0}
        sx={[
            props.disablePadding ? {padding: '0 !important'} : {padding: '20px !important'},
            {backgroundColor: theme.palette.background.default}
        ]}
    >
        <TabContext value={value}>
            <TabList
                indicatorColor="primary"
                TabIndicatorProps={{
                    className: classes.TabMenuIndicator
                }}>
                {props.menu.map((tab, index) =>
                    <Tab
                        key={tab.label}
                        icon={index.toString() === value ?
                            tab.activeIcon :
                            tab.icon}
                        value={index.toString()}
                        iconPosition="start"
                        className={classes.TabMenuItem}
                        onClick={() => setValue(index.toString())}
                        label={
                            <Typography
                                sx={props.collapseWidth && (windowWidth < props.collapseWidth) ? {
                                    display: 'none !important'
                                } : {}}
                                className={index.toString() === value ?
                                    classes.TabMenuLabelSelected :
                                    classes.TabMenuLabel}>
                                {tab.label}
                            </Typography>
                        }
                    />
                )}
            </TabList>
            <Divider className={classes.TabMenuDivider}/>
            {props.menu.map((tab, index) =>
                <TabPanel
                    key={tab.label}
                    value={index.toString()}
                    className={classes.TabMenuPanel}
                    sx={tab.disableMargin ? {margin: '0 !important'} : {}}
                >
                    {tab.component}
                </TabPanel>
            )}
        </TabContext>
    </Paper>
}