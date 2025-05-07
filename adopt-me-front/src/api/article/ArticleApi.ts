import {SearchApi} from "../commons/search/SearchApi";
import {ArticleDto} from "./response/ArticleDto";
import {ArticleSaveForm} from "./form/ArticleSaveForm";
import {ArticleUpdateForm} from "./form/ArticleUpdateForm";
import {ArticleTypeEnum} from "./ArticleTypeEnum";

export interface ArticleApi extends SearchApi<ArticleDto>{
    getAllArticle(id:string[], withDeleted: boolean): Promise<ArticleDto[]>

    getArticleById(id:string): Promise<ArticleDto>

    getArticleByType(type:ArticleTypeEnum): Promise<ArticleDto>

    saveArticle(form:ArticleSaveForm): Promise<ArticleDto>

    updateArticle(form:ArticleUpdateForm, id:string): Promise<void>

    deleteArticle(id:string): Promise<void>
}