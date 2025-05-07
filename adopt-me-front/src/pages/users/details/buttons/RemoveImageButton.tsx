import {CommonButton} from "../../../../components/button/common-button/CommonButton";
import {useTranslation} from "react-i18next";
import {ColorType} from "../../../../types/ColorType";
import React from "react";
import Box from "@mui/material/Box";

interface RemoveImageButtonProps {
    handleClick: () => void
    disabled: boolean
}

export const RemoveImageButton = ({handleClick, disabled}: RemoveImageButtonProps) => {
    const {t} = useTranslation()
    return <>
        <Box ml={1}/>
        <CommonButton
            variant="text"
            disabled={disabled}
            color={ColorType.ERROR}
            label={t("pages.userDetails.removeImageButtonLabel")}
            handleClick={handleClick}
        />
    </>
}