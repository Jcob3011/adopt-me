import {LoginForm} from "./form/LoginForm";
import {RegisterForm} from "./form/RegisterForm";
import {PasswordResetForm} from "./form/PasswordResetForm";
import {TokenValidationForm} from "./form/TokenValidationForm";
import {PasswordResetNotificationForm} from "./form/PasswordResetNotificationForm";
import { GmailUserPasswordForm } from "./form/GmailUserPasswordForm";
import {UserAuthTypeForm} from "./form/UserAuthTypeForm";
import {UserAuthTypeResponse} from "./response/UserAuthTypeResponse";
import {GmailUserAuthTypeForm} from "./form/GmailUserAuthTypeForm";
import {ChangeSelfPasswordForm} from "./form/ChangeSelfPasswordForm";
import {ChangeUserPasswordForm} from "./form/ChangeUserPasswordForm";

export interface LoginPassApi {

    login(form: LoginForm, rememberMe: boolean): Promise<void>

    register(form: RegisterForm): Promise<void>

    logoutSelf(token: string): Promise<void>

    logoutUserById(userId: string): Promise<void>

    resetPassword(form: PasswordResetForm): Promise<void>

    sendNotificationToResetPassword(form: PasswordResetNotificationForm): Promise<void>

    validateToken(form: TokenValidationForm): Promise<void>

    setPasswordToGmailAccount(form: GmailUserPasswordForm): Promise<void>

    checkLoginPassAuth(form: UserAuthTypeForm): Promise<UserAuthTypeResponse>

    checkGmailLoginPassAuth(form: GmailUserAuthTypeForm): Promise<UserAuthTypeResponse>

    changeSelfPassword(form: ChangeSelfPasswordForm): Promise<void>

    changeUserPassword(form: ChangeUserPasswordForm): Promise<void>
}