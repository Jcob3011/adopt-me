import axiosClient from "../../config/AxiosClient";
import {SearchResponse} from "../../commons/search/SearchResponse";
import {SearchForm} from "../../commons/search/SearchForm";
import {ArticleApi} from "../ArticleApi";
import {ArticleDto} from "../response/ArticleDto";
import {ArticleSaveForm} from "../form/ArticleSaveForm";
import {ArticleTypeEnum} from "../ArticleTypeEnum";
import {ArticleUpdateForm} from "../form/ArticleUpdateForm";

export class ArticleApiAxios implements ArticleApi
{
    getAllArticle(articleId:string[], withDeleted:boolean):Promise<ArticleDto[]>{
        return axiosClient.post('/article/all', articleId)
    }

    getArticleById(id:string): Promise<ArticleDto>{
        return axiosClient.get(`/article/${id}`)
    }

    getArticleByType(type: ArticleTypeEnum) : Promise<ArticleDto>{
        return axiosClient.get(type)
    }

    saveArticle(form: ArticleSaveForm) : Promise<ArticleDto>{
        return axiosClient.post('/article', form)
    }

    updateArticle(form: ArticleUpdateForm, id:string): Promise<void>{
        return axiosClient.put(`/article/${id}`, form)
    }

    deleteArticle(id:string): Promise<void>{
        return axiosClient.delete(`/article/${id}`)
    }

    search(form: SearchForm): Promise<SearchResponse<ArticleDto>> {
        return axiosClient.post("/article/search", form)
    }
}