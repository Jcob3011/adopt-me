import {CommonMenu} from "../common-menu/CommonMenu"
import i18n from "../../../locales/translation"
import React from "react";
import {t} from "i18next";

interface ChangeLanguageMenuProps {
    open: boolean
    anchorEl: HTMLElement | null
    handleCloseMenu: () => void
}

export const ChangeLanguageMenu = (props: ChangeLanguageMenuProps) => {
    const handleChangeLanguage = async (lang: string) => {
        await i18n.changeLanguage(lang)
        props.handleCloseMenu()
    }

    return <CommonMenu
        anchorEl={props.anchorEl}
        menuId="change-lang-menu"
        open={props.open}
        verticalPosition="top"
        horizontalPosition="right"
        handleClose={props.handleCloseMenu}
        items={[
            {
                label: "Polski",
                labelTranslation: t("menu.changeLanguage.polish"),
                selected: i18n.language === "pl",
                handleClick: () => handleChangeLanguage("pl")
            },
            {
                label: "English",
                labelTranslation: t("menu.changeLanguage.english"),
                selected: i18n.language === "en",
                handleClick: () => handleChangeLanguage("en")
            }
        ]}
    />
}