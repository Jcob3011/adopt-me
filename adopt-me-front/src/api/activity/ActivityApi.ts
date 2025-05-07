import {SearchApi} from "../commons/search/SearchApi";
import {ActivityDto} from "./response/ActivityDto";
import {ActivityStatisticDto} from "./response/ActivityStatisticDto";

export interface ActivityApi extends SearchApi<ActivityDto> {

    getActivity(activityId: string): Promise<ActivityDto>

    statistic(): Promise<ActivityStatisticDto[]>


}
