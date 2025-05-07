import {LoginPassApiAxios} from "./login-pass/api/LoginPassApiAxios";
import {LoginPassApi} from "./login-pass/LoginPassApi";
import {GmailAuthApi} from "./gmail-auth/GmailAuthApi";
import {UserAccountApi} from "./user-account/UserAccountApi";
import {GmailAuthApiAxios} from "./gmail-auth/api/GmailAuthApiAxios";
import {UserAccountApiAxios} from "./user-account/api/UserAccountApiAxios";
import {TagApi} from "./tag/TagApi";
import {TagApiAxios} from "./tag/api/TagApiAxios";
import {NotificationApi} from "./notification/NotificationApi";
import {NotificationApiAxios} from "./notification/api/NotificationApiAxios";
import {AttachmentApi} from "./attachment/AttachmentApi"
import {AttachmentApiAxios} from "./attachment/api/AttachmentApiAxios";
import {ActivityApi} from "./activity/ActivityApi";
import {ActivityApiAxios} from "./activity/api/ActivityApiAxios";
import {LanguageApiAxios} from "./language/api/LanguageApiAxios";
import {AnimalApi} from "./animal/AnimalApi";
import {ArticleApi} from "./article/ArticleApi";
import {AnimalApiAxios} from "./animal/api/AnimalApiAxios";
import {ArticleApiAxios} from "./article/api/ArticleApiAxios";
import {LanguageApi} from "./language/LanguageApi";



interface Api {
    loginPass: LoginPassApi,
    gmailAuth: GmailAuthApi,
    userAccount: UserAccountApi,
    tag: TagApi
    notification: NotificationApi
    attachment: AttachmentApi
    activity: ActivityApi
    language: LanguageApi
    animal: AnimalApi
    article: ArticleApi
}

const axiosApi: Api = {

    loginPass: new LoginPassApiAxios(),
    gmailAuth: new GmailAuthApiAxios(),
    userAccount: new UserAccountApiAxios(),
    tag: new TagApiAxios(),
    notification: new NotificationApiAxios(),
    attachment: new AttachmentApiAxios(),
    activity: new ActivityApiAxios(),
    language: new LanguageApiAxios(),
    animal: new AnimalApiAxios(),
    article: new ArticleApiAxios()
}


const api = axiosApi

export {api}
