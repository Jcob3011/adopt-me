import {SearchApi} from "../commons/search/SearchApi";
import {NotificationErrorDto} from "./response/NotificationErrorDto";

export interface NotificationApi extends SearchApi<NotificationErrorDto>{}