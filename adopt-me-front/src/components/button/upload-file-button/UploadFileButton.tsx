import {Box} from "@mui/material";
import {t} from "i18next";
import {CommonButton} from "../common-button/CommonButton";
import {ColorType} from "../../../types/ColorType";
import React, {useEffect} from "react";
import {useFilePicker} from "use-file-picker";

interface UploadImageButtonProps {
    handleFileChange: (file: File) => void,
    extensions: string[]
}

export const UploadFileButton = (props: UploadImageButtonProps) => {
    const [openFileSelector, {loading, errors, plainFiles }] = useFilePicker({
        accept: props.extensions,
        multiple: false
    });

    useEffect(() => {
        if(plainFiles.length !== 0 && errors.length === 0) {
            props.handleFileChange(plainFiles[0])
        }
    }, [loading])

    const handleClick = () => {
        openFileSelector()
    }

    return <>
        <Box m={1}></Box>
        <CommonButton
            animated
            disabled={loading}
            color={ColorType.INFO}
            label={t("pages.userDetails.uploadImageButtonLabel")}
            type="button"
            handleClick={handleClick}
        />
    </>
}