import {NotificationApi} from "../NotificationApi";
import {SearchForm} from "../../commons/search/SearchForm";
import {NotificationErrorDto} from "../response/NotificationErrorDto";
import {SearchResponse} from "../../commons/search/SearchResponse";
import axiosClient from "../../config/AxiosClient";

export class NotificationApiAxios implements NotificationApi {
    search(form: SearchForm): Promise<SearchResponse<NotificationErrorDto>> {
        return axiosClient.post(`/notification/search`, form)
    }
}