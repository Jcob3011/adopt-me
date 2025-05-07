import {useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import {AuthContext} from "../../providers/auth-provider/AuthProvider";
import {api} from "../../api";
import {RoutePath} from "../../router/RoutePath";
import {LoadingSpinner} from "../../components/loading-spinner/LoadingSpinner";
import {useTranslation} from "react-i18next";
import reactModal from "@prezly/react-promise-modal";
import {CommonDialog} from "../../components/dialog/common-dialog/CommonDialog";
import {SnackbarContext} from "../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../types/SnackbarType";
import {useTheme} from "@mui/material/styles";

export const GmailAuth = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {showSnackbar} = useContext(SnackbarContext)
    const {setLoggedUser} = useContext(AuthContext)
    const {t} = useTranslation()
    const theme = useTheme()

    useEffect(() => {
        const authenticate = async () => {
            const {tokenId} = await api.gmailAuth.exchangeAuthCode({code: code})
            const {authenticated} = await api.gmailAuth.didUserAuthenticateByGmail({
                tokenId: tokenId
            })

            if (!authenticated) {
                const isConfirmed = await reactModal(({show, onSubmit, onDismiss}) => {
                    return <CommonDialog
                        open={show}
                        title={t("pages.gmailAuth.dialog.title")}
                        content={t("pages.gmailAuth.dialog.content")}
                        submitButtonLabel={t("pages.gmailAuth.dialog.submitButtonLabel")}
                        cancelButtonLabel={t("pages.gmailAuth.dialog.cancelButtonLabel")}
                        handleSubmit={onSubmit}
                        handleCancel={onDismiss}
                        theme={theme}
                    />
                })

                if (isConfirmed) {
                    navigate(`${RoutePath.GMAIL_SET_PASSWORD}/${tokenId}`)
                    return
                }
            } else {
                const {authWithLoginPass} = await api.loginPass.checkGmailLoginPassAuth({
                    tokenId: tokenId
                })
                if (authWithLoginPass) {
                    showSnackbar(t("snackbar.error.gmailLoginPassEnabled"), SnackbarType.ERROR)
                    navigate(RoutePath.LOGIN)
                    return
                }
            }

            await api.gmailAuth.authenticate({tokenId: tokenId})
            const loggedUser = await api.userAccount.getSelfUser()
            setLoggedUser(loggedUser)
            navigate(RoutePath.HOME)
        }

        const params = new URLSearchParams(location.search)
        const code = params.get("code") || ""
        code.replace("%2F", "/")
        authenticate().catch(() => {
            navigate(RoutePath.LOGIN)
        })
    }, [])

    return <LoadingSpinner entireScreen/>
}