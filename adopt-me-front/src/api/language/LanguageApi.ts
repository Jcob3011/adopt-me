import {SearchApi} from "../commons/search/SearchApi";
import {LanguageDto} from "./response/LanguageDto";

export interface LanguageApi {

    getLanguage(): Promise<LanguageDto>

    getLanguageLevel(): Promise<LanguageDto>
}