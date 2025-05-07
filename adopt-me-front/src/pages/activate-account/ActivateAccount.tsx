import {useContext, useEffect} from "react";
import {LoadingSpinner} from "../../components/loading-spinner/LoadingSpinner";
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../api"
import {RoutePath} from "../../router/RoutePath";
import {SnackbarContext} from "../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../types/SnackbarType";
import {useTranslation} from "react-i18next";

export const ActivateAccount = () => {
    const {t} = useTranslation()
    const {token} = useParams()
    const {showSnackbar} = useContext(SnackbarContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            api.userAccount.activateAccount({token: token})
                .then(() => {
                    showSnackbar(
                        t("snackbar.success.accountActivated"),
                        SnackbarType.SUCCESS
                    )
                }).catch(() => {
            })
                .finally(() => navigate(RoutePath.LOGIN))
        } else {
            navigate(RoutePath.LOGIN)
        }
    }, [])

    return <LoadingSpinner entireScreen/>
}