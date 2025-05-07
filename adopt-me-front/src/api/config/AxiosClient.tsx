import axios from "axios";
import {AuthTokenStorage} from "../../storage/AuthTokenStorage";
import {ReactElement, useContext, useEffect} from "react";
import {SnackbarContext} from "../../providers/snackbar-provider/SnackbarProvider";
import {SnackbarType} from "../../types/SnackbarType";
import {axiosHandledExceptions} from "./AxiosHandledExceptions";
import {useTranslation} from "react-i18next";
import {SnackbarMessageMapper} from "../../utils/snackbar-message-mapper/SnackbarMessageMapper";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080"
})

interface AxiosInterceptorProps {
    children: ReactElement | null
}

export const AxiosInterceptor = ({children}: AxiosInterceptorProps): ReactElement | null => {
    const {t} = useTranslation()
    const {showSnackbar} = useContext(SnackbarContext)

    const requestInterceptor = axiosClient.interceptors.request.use(config => {
        config.headers.Authorization = AuthTokenStorage.getToken()
        return config
    })

    const responseInterceptor = axiosClient.interceptors.response.use(response => {
        if (response.data) {
            return response.data
        }
        return response
    }, error => {
        const errorCode = error.response.data.errorCode
        if (axiosHandledExceptions.includes(errorCode)) {
            const snackbarMessageTs = SnackbarMessageMapper.mapFromErrorCode(errorCode)
            showSnackbar(t(snackbarMessageTs), SnackbarType.ERROR)
        }
        throw error
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(requestInterceptor)
            axios.interceptors.response.eject(responseInterceptor)
        }
    })

    return children
}

export default axiosClient