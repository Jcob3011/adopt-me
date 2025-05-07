import {Box, Breadcrumbs, Grid, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import classes from "./Breadcrumb.module.css";
import {RoutePath} from "../../router/RoutePath";
import * as React from "react";
import {Theme, useTheme} from "@mui/material/styles";
import {ArrowRightIcon} from "../icons/ArrowRightIcon";

function generateBreadcrumbItem(pathComponents: string[], index: number, breadcrumbItems: any[], theme: Theme) {
    const path = `/${pathComponents.slice(0, index + 1).join('/')}`;
    const matchingItem = breadcrumbItems.find(item => item.path === path);
    if (matchingItem) {
        if (index === pathComponents.length - 1) {
            return (
                <Typography className={classes.MainTypography} key={`${index}-${path}`}>
                    {matchingItem.label}
                </Typography>
            );
        } else {
            return (
                <Link
                    to={matchingItem.path}
                    key={`${index}-${path}`}
                    className={classes.Link}>
                    <Typography className={classes.MainTypography} style={{
                        color: theme.palette.text.secondary
                    }} key={index}>
                        {matchingItem.label}
                    </Typography>
                </Link>
            );
        }
    } else {
        return null;
    }
}

interface BreadcrumbProps {
    breadcrumbItems: {
        path: RoutePath,
        label: JSX.Element | string
    }[]
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({breadcrumbItems}) => {
    const location = useLocation()
    const currentPath = location.pathname
    const theme = useTheme()

    const pathComponents = currentPath.split('/').filter(item => item !== '')
    return (
        <Box className={classes.MainBox}
             style={{
                 backgroundColor: theme.palette.background.default
             }}
        >
            <Grid className={classes.Grid}>
                <div className={classes.TypographyForTitleH3}>
                    <h3 className={classes.TypographyForTitleH3}>
                        {pathComponents.length > 0 ?
                            pathComponents[0].charAt(0).toUpperCase() + pathComponents[0].slice(1) :
                            'Home'}
                    </h3>
                </div>
                <Breadcrumbs
                    aria-label="breadcrumb"
                    separator={<ArrowRightIcon/>}
                    className={classes.Breadcrumb}
                >
                    <Link to={"/"}>
                        <HomeIcon
                            style={{
                                fill: theme.palette.secondary.main
                            }}
                            className={classes.HomeIcon}/>
                    </Link>
                    {pathComponents.map((component, index) => {
                        return generateBreadcrumbItem(pathComponents, index, breadcrumbItems, theme)
                    })}
                </Breadcrumbs>
            </Grid>
        </Box>
    );
};