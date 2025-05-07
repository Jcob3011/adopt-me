import React, {createContext, ReactNode, useState} from "react";
import {CommonSnackbar} from "../../components/snackbar/CommonSnackbar";
import {SnackbarType} from "../../types/SnackbarType";

export interface SnackbarContextType {
    showSnackbar: (message: string, type: SnackbarType) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
    showSnackbar: () => {
    },
})

type SnackbarProviderProps = {
    children: ReactNode
}

export const SnackbarProvider = ({children}: SnackbarProviderProps) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [snackbarType, setSnackbarType] = useState<SnackbarType>()

    const showSnackbar = (message: string, type: SnackbarType) => {
        setOpen(true)
        setMessage(message)
        setSnackbarType(type)
    }

    const hideSnackbar = () => {
        setOpen(false)
    }

    return <SnackbarContext.Provider value={{showSnackbar}}>
        {children}
        {open &&
            <CommonSnackbar
                handleHideSnackbar={hideSnackbar}
                opened={open}
                message={message}
                type={snackbarType || SnackbarType.SUCCESS}
            />
        }
    </SnackbarContext.Provider>
}