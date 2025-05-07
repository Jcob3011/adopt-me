import {TagApi} from "../TagApi";
import axiosClient from "../../config/AxiosClient";
import {TagDto} from "../response/TagDto";
import {TagForm} from "../form/TagForm";
import {SearchForm} from "../../commons/search/SearchForm";
import {SearchResponse} from "../../commons/search/SearchResponse";

export class TagApiAxios implements TagApi {
    deleteTag(tagId: string): Promise<void> {
        return axiosClient.delete(`/tag/${tagId}`)
    }

    getTag(tagId: string): Promise<TagDto> {
        return axiosClient.get(`/tag/${tagId}`)
    }

    saveTag(form: TagForm): Promise<TagDto> {
        return axiosClient.post(`/tag`, form)
    }

    search(form: SearchForm): Promise<SearchResponse<TagDto>> {
        return axiosClient.post(`/tag/search`, form)
    }

    updateTag(form: TagForm, tagId: string): Promise<void> {
        return axiosClient.put(`/tag/${tagId}`, form)
    }
}