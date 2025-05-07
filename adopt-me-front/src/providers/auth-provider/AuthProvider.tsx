import React, {createContext, ReactNode, useEffect, useState} from "react";
import {UserAccountDto} from "../../api/user-account/response/UserAccountDto";
import {api} from "../../api";
import {AuthTokenStorage} from "../../storage/AuthTokenStorage";
import {LoadingSpinner} from "../../components/loading-spinner/LoadingSpinner";

export interface AuthContextType {
    loggedUser?: UserAccountDto
    setLoggedUser: (user?: UserAccountDto) => void
}

export const AuthContext = createContext<AuthContextType>({
    loggedUser: undefined,
    setLoggedUser: () => {
    }
})

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loggedUser, setLoggedUser] =
        useState<UserAccountDto | undefined>(undefined)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const token = AuthTokenStorage.getToken()
        if (token) {
            api.userAccount.getSelfUser().then(user => {
                setLoggedUser(user)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setLoading(false)
        }
    }, [])

    return <AuthContext.Provider value={{loggedUser, setLoggedUser}}>
        {loading ? <LoadingSpinner entireScreen/> : children}
    </AuthContext.Provider>
}