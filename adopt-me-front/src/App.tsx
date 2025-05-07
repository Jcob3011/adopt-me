import React from 'react';
import './App.css';
import {RoutesConfig} from "./router/RoutesConfig";
import {RoutePath} from "./router/RoutePath";
import HomeIcon from "@mui/icons-material/Home";
import {TFunction} from "i18next";
import {LogoutIcon} from "./components/icons/LogoutIcon";
import {PointerIcon} from "./components/icons/PointerIcon";
import {MenuSettingsIcon} from "./components/icons/MenuSettingsIcon";
import {LogsIcon} from "./components/icons/LogsIcon";
import {IMenuItem} from "./components/layout/logged-layout/Layout";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';

export const menuItems = (t: TFunction): IMenuItem[] => {

    return [
        {
            sectionName: t('pages.home.drawer.dashboard'),
            options: [
                {
                    label: t('pages.home.drawer.logs'),
                    icon: <QueryStatsOutlinedIcon/>,
                    path: RoutePath.ACTIVITY_LOGS,
                    subMenu: []
                }
            ]
        },
        {
            sectionName: t('pages.home.drawer.animal'),
            options: [
                {
                    label: t('pages.home.drawer.animals'),
                    icon: <EmojiNatureOutlinedIcon/>,
                    path: undefined,
                    subMenu: [
                        {
                            label: t('pages.home.drawer.addAnimal'),
                            icon: undefined,
                            path: RoutePath.CREATE_ANIMAL,
                        },
                        {
                            label: t('pages.home.drawer.animalsList'),
                            icon: undefined,
                            path: RoutePath.ANIMAL,
                        }
                    ]
                },
                {
                    label: t('pages.home.drawer.article'),
                    icon: <AssignmentOutlinedIcon/>,
                    path: undefined,
                    subMenu: [
                        {
                            label: t('pages.home.drawer.addArticle'),
                            icon: undefined,
                            path: RoutePath.CREATE_ARTICLE,
                        },
                        {
                            label: t('pages.home.drawer.articleList'),
                            icon: undefined,
                            path: RoutePath.ARTICLE,
                        }
                    ]
                },
                {
                    label: t('pages.home.drawer.tags'),
                    icon: <SellOutlinedIcon/>,
                    path: undefined,
                    subMenu: [
                        {
                            label: t('pages.home.drawer.addTag'),
                            icon: <PointerIcon/>,
                            path: RoutePath.TAG_CREATE_PAGE,
                        },
                        {
                            label: t('pages.home.drawer.tagsList'),
                            icon: <PointerIcon/>,
                            path: RoutePath.TAG_LIST_PAGE,
                        }
                    ]
                }
            ]
        },
        {
            sectionName: t('pages.home.drawer.configuration'),
            options: [
                {
                    label: t('pages.home.drawer.usersConf'),
                    icon: <GroupOutlinedIcon/>,
                    path: undefined,
                    subMenu: [
                        {
                            label: t("pages.home.drawer.usersCreate"),
                            icon: undefined,
                            path: RoutePath.USERS_CREATE,
                        },
                        {
                            label: t("pages.home.drawer.usersList"),
                            icon: undefined,
                            path: RoutePath.USERS,
                        }
                    ]
                },
            ]
        }
    ]
}

export const topRightMenuItems = (t: TFunction, userId: string) => {
    return {
        settings: [
            {
                label: t('pages.home.topRightMenu.accountSettings'),
                icon: <MenuSettingsIcon/>,
                path: `/users/details/${userId}`,
            },

            {
                label: t('pages.home.topRightMenu.logs'),
                icon: <LogsIcon/>,
                path: RoutePath.MY_ACTIVITY_LOGS,
            },
            {
                label: t('pages.home.topRightMenu.logout'),
                icon: <LogoutIcon/>,
                path: RoutePath.LOGOUT,
            },
        ]
    }
}

export const breadcrumbItems = [
    {path: RoutePath.HOME, label: <HomeIcon/>},
    {path: RoutePath.ACTIVITY_LOGS, label: "Activities logs"},
    {path: RoutePath.ACTIVITY_LOGS_DETAILS, label: "Activities logs details"},
    {path: RoutePath.ANIMAL, label: "Animals"},
    {path: RoutePath.ANIMAL_DETAILS_PAGE, label: "Details"},
    {path: RoutePath.CREATE_ANIMAL, label: "Create"},
    {path: RoutePath.ARTICLE, label: "Article"},
    {path: RoutePath.CREATE_ARTICLE, label: "Create"},
    {path: RoutePath.ARTICLE_DETAILS_PAGE, label: "Details"},
    {path: RoutePath.NOTIFICATION_ERRORS, label: "Notification errors"},
    {path: RoutePath.NOT_FOUND, label: "Not found"},
    {path: RoutePath.TAG_CREATE_PAGE, label: "Create"},
    {path: RoutePath.TAG_DETAILS_PAGE, label: "Details"},
    {path: RoutePath.TAG_LIST_PAGE, label: "Tag"},
    {path: RoutePath.USERS, label: "Users"},
    {path: RoutePath.USERS_DETAILS, label: "Details"},
    {path: RoutePath.USERS_CREATE, label: "Create"},

]

function App() {
    return <RoutesConfig/>
}

export default App;
