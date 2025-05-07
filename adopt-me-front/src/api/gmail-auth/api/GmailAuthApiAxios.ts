import {GmailAuthApi} from "../GmailAuthApi";
import {GmailAuthorizationCodeForm} from "../form/GmailAuthorizationCodeForm";
import {RedirectUrlResponse} from "../response/RedirectUrlResponse";
import {AuthTokenStorage} from "../../../storage/AuthTokenStorage";
import axiosClient from "../../config/AxiosClient";
import {GmailAuthForm} from "../form/GmailAuthForm";
import {AuthCodeExchangeResponse} from "../response/AuthCodeExchangeResponse";
import {UserAuthenticatedResponse} from "../response/UserAuthenticatedResponse";

export class GmailAuthApiAxios implements GmailAuthApi {

    authenticate(form: GmailAuthForm): Promise<void> {
        return axiosClient.post("/auth/gmail", form).then(response => {
            // @ts-ignore
            AuthTokenStorage.saveToken(response.token, true)
        })
    }

    getGmailAuthUrl(): Promise<RedirectUrlResponse> {
        return axiosClient.get("/auth/gmail/get-auth-url")
    }

    didUserAuthenticateByGmail(form: GmailAuthForm): Promise<UserAuthenticatedResponse> {
        return axiosClient.post("/auth/gmail/check-authentication", form)
    }

    exchangeAuthCode(form: GmailAuthorizationCodeForm): Promise<AuthCodeExchangeResponse> {
        return axiosClient.post("/auth/gmail/exchange-auth-code", form)
    }

    validateTokenId(form: GmailAuthForm): Promise<void> {
        return axiosClient.post("/auth/gmail/validate-token-id", form)
    }
}