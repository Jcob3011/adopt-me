import {SearchApi} from "../commons/search/SearchApi";
import {TagDto} from "./response/TagDto";
import {TagForm} from "./form/TagForm";

export interface TagApi extends SearchApi<TagDto> {

    getTag(tagId: string): Promise<TagDto>

    saveTag(form: TagForm): Promise<TagDto>

    deleteTag(tagId: string): Promise<void>

    updateTag(form: TagForm, tagId: string): Promise<void>

}