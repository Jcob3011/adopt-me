import {LanguageApi} from "../LanguageApi";
import {LanguageDto} from "../response/LanguageDto";
import axiosClient from "../../config/AxiosClient";

export class LanguageApiAxios implements LanguageApi {
    getLanguage(): Promise<LanguageDto> {
        return axiosClient.get(`/language/list`)
    }

    getLanguageLevel(): Promise<LanguageDto> {
        return axiosClient.get(`/language/level`);
    }

}