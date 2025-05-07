import {UserAccountDto} from "./response/UserAccountDto";
import {UserAccountSaveForm} from "./form/UserAccountSaveForm";
import {UserAccountSelfUpdateForm} from "./form/UserAccountSelfUpdateForm";
import {UserAccountUpdateForm} from "./form/UserAccountUpdateForm";
import {ActivateAccountNotificationForm} from "./form/ActivateAccountNotificationForm";
import {ActivateAccountForm} from "./form/ActivateAccountForm";
import { SearchApi } from "../commons/search/SearchApi";

export interface UserAccountApi extends SearchApi<UserAccountDto>{

    getUser(userId: string): Promise<UserAccountDto>

    getSelfUser(): Promise<UserAccountDto>

    saveUser(form: UserAccountSaveForm): Promise<UserAccountDto>

    deleteUser(userId: string): Promise<void>

    updateSelfUser(form: UserAccountSelfUpdateForm): Promise<void>

    updateUserById(form: UserAccountUpdateForm, userId: string): Promise<void>

    sendNotificationToActivateAccount(form: ActivateAccountNotificationForm): Promise<void>

    activateAccount(form: ActivateAccountForm): Promise<void>

    validateActivateAccountToken(form: ActivateAccountForm): Promise<void>
}