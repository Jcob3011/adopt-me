import React, {useContext, useEffect} from "react";
import {AuthContext, AuthContextType} from "../../providers/auth-provider/AuthProvider";
import {RoutePath} from "../../router/RoutePath";
import {Navigate} from "react-router-dom";
import {AuthTokenStorage} from "../../storage/AuthTokenStorage";

export const Logout = () => {
    const {setLoggedUser} = useContext<AuthContextType>(AuthContext)

    useEffect(() => {
        AuthTokenStorage.removeToken()
        setLoggedUser(undefined)
    }, [])

    return <Navigate to={RoutePath.LOGIN} replace/>
}