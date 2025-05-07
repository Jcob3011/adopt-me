import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";
import {AuthContext} from "../providers/auth-provider/AuthProvider";
import {RoutePath} from "./RoutePath";

type RouteType = React.ReactElement | null

type ProtectedRouteProps = {
    children:  RouteType
}

export const ProtectedRoute = ({children}: ProtectedRouteProps):  RouteType => {
    const {loggedUser} = useContext(AuthContext)
    return loggedUser ? children : <Navigate to={RoutePath.LOGIN} replace/>
}