import {ArticleTypeEnum} from "../ArticleTypeEnum";

export interface ClientArticle{
    id:string
    title:string
    content:string
    type:ArticleTypeEnum
    attachmentId?:string

}