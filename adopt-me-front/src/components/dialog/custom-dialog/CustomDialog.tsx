import Dialog from "@mui/material/Dialog";
import {Box, Button} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import {ReactElement} from "react";
import {useTranslation} from "react-i18next";
import classes from "./CustomDialog.module.css"
import {useTheme} from "@mui/material/styles";

type Props = {
    title: string
    content: ReactElement
    open: boolean
    handleClose: () => void
    hasCancelButton?: boolean
    cancelButtonVariant?: 'cancel' | 'back'
    customButtons?: CustomButton[]
}

type CustomButton = {
    id: string,
    text: string,
    color?: "inherit" | "info" | "primary" | "secondary" | "success" | "error" | "warning" | undefined,
    action: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}

export const CustomDialog = ({title, open, handleClose, customButtons, hasCancelButton, cancelButtonVariant, content}: Props) => {
    const {t} = useTranslation()
    const theme = useTheme()

    return (
        <>
            {open &&
                <Dialog
                    open={open}
                    onClose={() => handleClose()}
                >
                    <Box className={classes.dialogBox}
                         sx={{
                             backgroundColor: theme.palette.background.default,
                             border: `1px ${theme.palette.background.default} solid`
                         }}>
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogContent>
                            {content}
                        </DialogContent>
                        <DialogActions className={classes.buttonBox}>
                            {customButtons &&
                                customButtons.map((button, index) =>
                                    <Button
                                        id={button.id}
                                        color={button.color ? button.color : 'info'}
                                        key={`custom-dialog-custom-button-${button.id}-${index}`}
                                        onClick={(event) => {
                                            button.action(event)
                                            handleClose()
                                        }}>
                                        {button.text}
                                    </Button>
                                )
                            }
                            {hasCancelButton &&
                                <Button onClick={() => handleClose()} color='info' className={classes.button}>
                                    {cancelButtonVariant === 'back' ?  t(`components.customDialog.back`) : t(`components.customDialog.cancel`)}
                                </Button>
                            }
                        </DialogActions>
                    </Box>
                </Dialog>
            }
        </>
    )
}