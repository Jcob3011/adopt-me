import {Box, Typography} from "@mui/material"
import classes from "./UserAttachmentBox.module.css"
import * as React from "react";
import {useContext} from "react";
import {useTranslation} from "react-i18next";
import {RemoveImageButton} from "../buttons/RemoveImageButton";
import {UploadFileButton} from "../../../../components/button/upload-file-button/UploadFileButton";
import {api} from "../../../../api";
import {UserAccountDto} from "../../../../api/user-account/response/UserAccountDto";
import {SnackbarContext} from "../../../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../../../types/SnackbarType";
import {Image} from "../../../../components/image/Image";
import Paper from "@mui/material/Paper";
import {useTheme} from "@mui/material/styles";

interface UserAttachmentBoxProps {
    userAccount: UserAccountDto
    reloadAttachment: () => void
}

export const UserAttachmentBox = ({userAccount, reloadAttachment}: UserAttachmentBoxProps) => {
    const {t} = useTranslation()
    const {showSnackbar} = useContext(SnackbarContext)
    const theme = useTheme()

    const handleUploadImage = (file: File) => {
        if (file) {
            api.attachment.save(
                "user account image",
                "user account image",
                file
            ).then(attachment => {
                api.userAccount.updateUserById({
                    email: userAccount.email,
                    firstName: userAccount.firstName,
                    lastName: userAccount.lastName,
                    role: userAccount.role,
                    status: userAccount.status,
                    attachmentId: attachment.id
                }, userAccount.id).then(() => {
                    reloadAttachment()
                    showSnackbar(
                        t("snackbar.success.attachmentUploaded"),
                        SnackbarType.SUCCESS
                    )
                })
            })
        }
    }

    const handleRemoveImage = () => {
        api.userAccount.updateUserById({
            email: userAccount.email,
            firstName: userAccount.firstName,
            lastName: userAccount.lastName,
            role: userAccount.role,
            status: userAccount.status,
        }, userAccount.id).then(() => {
            userAccount.attachment = undefined
            showSnackbar(
                t("snackbar.success.attachmentRemoved"),
                SnackbarType.SUCCESS
            )
        })
    }

    return <Paper className={classes.UserAttachmentBox} sx={{
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider} !important`
    }}>
        <Box className={classes.UserAttachmentHeader}>
            {t("pages.userDetails.avatarSectionTitle")}
        </Box>
        <Box className={classes.UserAttachmentContent} sx={{
            borderTop: `1px solid ${theme.palette.divider} !important`
        }}>
            {userAccount.attachment ?
                <Box className={classes.UserImage}>
                    <Image
                        minWidth={150}
                        minHeight={150}
                        clickable={true}
                        objectFit="cover"
                        id={userAccount.attachment.id}
                    />
                </Box> :
                <Typography className={classes.AttachmentNotFoundLabel} sx={{
                    color: theme.palette.text.secondary
                }}>
                    {t("pages.userDetails.emptyAvatarLabel")}
                </Typography>}
        </Box>
        <Box className={classes.ButtonsBox}>
            <UploadFileButton
                handleFileChange={handleUploadImage}
                extensions={[
                    ".jpg",
                    ".jpeg",
                    ".png"
                ]}
            />
            {userAccount.attachment &&
                <RemoveImageButton
                    handleClick={handleRemoveImage}
                    disabled={!userAccount.attachment}
                />}
        </Box>
    </Paper>
}