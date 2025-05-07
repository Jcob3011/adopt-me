import {LoginPassApi} from "../LoginPassApi";
import {LoginForm} from "../form/LoginForm";
import {RegisterForm} from "../form/RegisterForm";
import {PasswordResetForm} from "../form/PasswordResetForm";
import {PasswordResetNotificationForm} from "../form/PasswordResetNotificationForm";
import {TokenValidationForm} from "../form/TokenValidationForm";
import axiosClient from "../../config/AxiosClient";
import {AuthTokenStorage} from "../../../storage/AuthTokenStorage";
import { GmailUserPasswordForm } from "../form/GmailUserPasswordForm";
import { GmailUserAuthTypeForm } from "../form/GmailUserAuthTypeForm";
import { UserAuthTypeResponse } from "../response/UserAuthTypeResponse";
import {UserAuthTypeForm} from "../form/UserAuthTypeForm";
import { ChangeSelfPasswordForm } from "../form/ChangeSelfPasswordForm";
import { ChangeUserPasswordForm } from "../form/ChangeUserPasswordForm";


export class LoginPassApiAxios implements LoginPassApi {

    login(form: LoginForm, rememberMe: boolean): Promise<void> {
        return axiosClient.post("/auth/login", form).then(response => {
            // @ts-ignore
            AuthTokenStorage.saveToken(response.token, rememberMe)
        })
    }

    register(form: RegisterForm): Promise<void> {
        return axiosClient.post("/auth/register", form)
    }

    logoutSelf(token: string): Promise<void> {
        return axiosClient.post("/auth/logout/self").then(() =>
            AuthTokenStorage.removeToken()
        )
    }

    logoutUserById(userId: string): Promise<void> {
        return axiosClient.post(`/auth/logout/${userId}`)
    }

    resetPassword(form: PasswordResetForm): Promise<void> {
        return axiosClient.post("/password-reset", form)
    }

    sendNotificationToResetPassword(form: PasswordResetNotificationForm): Promise<void> {
        return axiosClient.post("/password-reset/send-notification", form)
    }

    validateToken(form: TokenValidationForm): Promise<void> {
        return axiosClient.post("/password-reset/validate-token", form)
    }

    setPasswordToGmailAccount(form: GmailUserPasswordForm): Promise<void> {
        return axiosClient.post("/auth/gmail/set-password", form)
    }

    checkGmailLoginPassAuth(form: GmailUserAuthTypeForm): Promise<UserAuthTypeResponse> {
        return axiosClient.post("/auth/check-gmail-login-pass-auth", form)
    }

    checkLoginPassAuth(form: UserAuthTypeForm): Promise<UserAuthTypeResponse> {
        return axiosClient.post("/auth/check-login-pass-auth", form)
    }

    changeSelfPassword(form: ChangeSelfPasswordForm): Promise<void> {
        return axiosClient.post("/auth/change-self-password", form)
    }

    changeUserPassword(form: ChangeUserPasswordForm): Promise<void> {
        return axiosClient.post("/auth/change-user-password", form)
    }
}