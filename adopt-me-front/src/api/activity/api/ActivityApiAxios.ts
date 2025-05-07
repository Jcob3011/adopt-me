import {ActivityApi} from "../ActivityApi";
import {ActivityDto} from "../response/ActivityDto";
import {SearchResponse} from "../../commons/search/SearchResponse";
import {SearchForm} from "../../commons/search/SearchForm";
import axiosClient from "../../config/AxiosClient";
import {ActivityStatisticDto} from "../response/ActivityStatisticDto";
import {ActivityType} from "../../../types/ActivityType";

export class ActivityApiAxios implements ActivityApi{
    getActivity(activityId: string): Promise<ActivityDto> {
        return axiosClient.get(`/activities/${activityId}`)
    }

    search(form: SearchForm): Promise<SearchResponse<ActivityDto>> {
        return axiosClient.post(`/activities/search`, form)
    }

    statistic(): Promise<ActivityStatisticDto[]> {
        return axiosClient.post(`/activities/statistics`, {
            type: [...Object.keys(ActivityType)],
            createdOnFrom: new Date("2022-01-01"),
            createdOnTo: new Date(),
        })
    }

}
