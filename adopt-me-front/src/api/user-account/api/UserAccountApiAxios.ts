import {UserAccountApi} from "../UserAccountApi";
import {ActivateAccountForm} from "../form/ActivateAccountForm";
import {UserAccountDto} from "../response/UserAccountDto";
import {UserAccountSaveForm} from "../form/UserAccountSaveForm";
import {SearchForm} from "../../commons/search/SearchForm";
import {SearchResponse} from "../../commons/search/SearchResponse";
import {ActivateAccountNotificationForm} from "../form/ActivateAccountNotificationForm";
import {UserAccountSelfUpdateForm} from "../form/UserAccountSelfUpdateForm";
import {UserAccountUpdateForm} from "../form/UserAccountUpdateForm";
import axiosClient from "../../config/AxiosClient";

export class UserAccountApiAxios implements UserAccountApi {

    deleteUser(userId: string): Promise<void> {
        return axiosClient.delete(`/user-account/${userId}`)
    }

    getUser(userId: string): Promise<UserAccountDto> {
        return axiosClient.get(`/user-account/${userId}`)
    }

    saveUser(form: UserAccountSaveForm): Promise<UserAccountDto> {
        return axiosClient.post("/user-account", form)
    }

    search(form: SearchForm): Promise<SearchResponse<UserAccountDto>> {
        return axiosClient.post("/user-account/search", form)
    }

    updateSelfUser(form: UserAccountSelfUpdateForm): Promise<void> {
        return axiosClient.put("/user-account/self", form)
    }

    updateUserById(form: UserAccountUpdateForm, userId: string): Promise<void> {
        return axiosClient.put(`/user-account/${userId}`, form)
    }

    activateAccount(form: ActivateAccountForm): Promise<void> {
        return axiosClient.post("/activate-account", form)
    }

    sendNotificationToActivateAccount(form: ActivateAccountNotificationForm): Promise<void> {
        return axiosClient.post("/activate-account/send-notification", form)
    }

    validateActivateAccountToken(form: ActivateAccountForm): Promise<void> {
        return axiosClient.post("/activate-account/validate-token", form)
    }

    getSelfUser(): Promise<UserAccountDto> {
        return axiosClient.get("/user-account/self")
    }
}