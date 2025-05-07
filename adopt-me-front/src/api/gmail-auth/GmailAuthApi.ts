import {RedirectUrlResponse} from "./response/RedirectUrlResponse";
import {GmailAuthorizationCodeForm} from "./form/GmailAuthorizationCodeForm";
import {GmailAuthForm} from "./form/GmailAuthForm";
import {AuthCodeExchangeResponse} from "./response/AuthCodeExchangeResponse";
import {UserAuthenticatedResponse} from "./response/UserAuthenticatedResponse";

export interface GmailAuthApi {

    getGmailAuthUrl(): Promise<RedirectUrlResponse>

    authenticate(form: GmailAuthForm): Promise<void>

    didUserAuthenticateByGmail(form: GmailAuthForm): Promise<UserAuthenticatedResponse>

    exchangeAuthCode(form: GmailAuthorizationCodeForm): Promise<AuthCodeExchangeResponse>

    validateTokenId(form: GmailAuthForm): Promise<void>
}