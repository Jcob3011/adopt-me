import {Box, Button, Typography} from "@mui/material";
import {EditIcon} from "../icons/EditIcon";
import * as React from "react";
import {ReactNode, useContext} from "react";
import classes from "./DetailsBox.module.css";
import {DeleteIcon} from "../icons/DeleteIcon";
import {RoundedBox} from "../rounded-box/RoundedBox";
import {t} from "i18next";
import {AuthContext} from "../../providers/auth-provider/AuthProvider";
import {useParams} from "react-router-dom";
import reactModal from "@prezly/react-promise-modal";
import {ListDialog} from "../dialog/list-dialog/ListDialog";
import {Image} from "../image/Image";
import {useTranslation} from "react-i18next";
import {Theme, useTheme} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

type DetailBoxValueType = string | number | Date

interface DetailsBoxProps {
    title: string,
    updateTitle: string,
    handleDelete: () => void,
    handleUpdate: () => void
    updatingMode: boolean,
    updateComponent: ReactNode,
    attachment?: {
        label: string,
        id: string
    }
    data: {
        title: string,
        fields: {
            label: string,
            dialogLabel?: string
            value: DetailBoxValueType[] | undefined,
            roundedBox?: boolean
        }[]
    }[]
}

export const DetailsBox = (props: DetailsBoxProps) => {
    const {id} = useParams()
    const {t} = useTranslation()
    const {loggedUser} = useContext(AuthContext)
    const theme = useTheme()

    const handleShowDialog = (items: DetailBoxValueType[], label?: string) => {
        reactModal(({show, onDismiss}) => {
            return <ListDialog
                open={show}
                theme={theme}
                items={items}
                title={label || ""}
                cancelButtonLabel={t("pages.userDetails.cancelButtonLabel")}
                handleCancel={onDismiss}
            />
        })
    }

    const handleFieldMap = (roundedBox: boolean, label: DetailBoxValueType) => {
        return roundedBox ?
            <RoundedBox
                resize
                key={label.toString()}
                label={label.toString()}
            /> :
            <Typography
                key={label.toString()}
                className={classes.DetailsContentItemValue} sx={{
                color: theme.palette.text.primary
            }}>
                {label.toString()}
            </Typography>
    }

    return <Paper className={classes.Details} sx={{
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider} !important`,
        color: theme.palette.text.primary
    }}>
        <Box className={classes.DetailsHeader}>
            {props.updatingMode ? props.updateTitle : props.title}
            <Box className={classes.DetailsHeaderButtons}>
                <Button onClick={props.handleUpdate} className={classes.EditButton}>
                    <EditIcon/>
                    <Box m={0.5}/>
                    {props.updatingMode ?
                        t("pages.userDetails.closeUpdateLabel") :
                        t("pages.userDetails.updateLabel")}
                </Button>
                {id !== loggedUser!.id &&
                    <Button
                        color="error"
                        onClick={props.handleDelete}
                        className={classes.DeleteButton}>
                        <DeleteIcon/>
                        <Box m={0.5}/>
                        {t("pages.userDetails.deleteLabel")}
                    </Button>}
            </Box>
        </Box>
        {props.updatingMode ?
            <Box className={classes.DetailsContent} sx={{
                borderTop: `1px solid ${theme.palette.divider} !important`
            }}>
                {props.updateComponent}
            </Box>
            :
            <Box>
                {props.attachment &&
                    <Box className={classes.DetailsBoxAttachment} sx={{
                        borderTop: `1px solid ${theme.palette.divider} !important`
                    }}>
                        <Typography className={classes.DetailsContentHeader}>
                            {props.attachment.label}
                        </Typography>
                        <Box className={classes.Attachment}>
                            <Box className={classes.AttachmentBackdrop}/>
                            <Image
                                id={props.attachment.id}
                                objectFit="contain"
                                clickable={true}
                                maxWidth={300}
                                maxHeight={150}
                            />
                        </Box>
                    </Box>}
                {props.data.map(data =>
                    <Box key={data.title} className={classes.DetailsContent} sx={{
                        borderTop: `1px solid ${theme.palette.divider} !important`
                    }}>
                        <Typography className={classes.DetailsContentHeader} sx={{
                            color: theme.palette.text.primary
                        }}>
                            {data.title}
                        </Typography>
                        {data.fields.map(field =>
                            <Box key={field.label} className={classes.DetailsContentItem}>
                                <Typography className={classes.DetailsContentItemLabel} sx={{
                                    color: theme.palette.text.primary
                                }}>
                                    {field.label}
                                </Typography>
                                <Typography className={classes.DetailsContentItemColon} sx={{
                                    color: theme.palette.text.primary
                                }}>
                                    :
                                </Typography>
                                {field.value ?
                                    field.value.length > 3 ?
                                        field.value.slice(0, 3).map(value =>
                                            handleFieldMap(Boolean(field.roundedBox), value)) :
                                        field.value.map(value =>
                                            handleFieldMap(Boolean(field.roundedBox), value)) :
                                    <Typography className={classes.DetailsContentItemValue} sx={{
                                        color: theme.palette.text.primary
                                    }}>
                                        Field is not defined
                                    </Typography>
                                }
                                {field.value && field.value.length > 3 &&
                                    <RoundedBox
                                        handleClick={() => {
                                            handleShowDialog(field.value!, field.dialogLabel)
                                        }}
                                        key="rounded-box-dots"
                                        label="..."
                                    />}
                            </Box>
                        )}
                    </Box>)}
            </Box>}
    </Paper>
}