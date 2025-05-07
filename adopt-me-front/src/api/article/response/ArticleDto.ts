import {ArticleTypeEnum} from "../ArticleTypeEnum";

export interface ArticleDto{
    id:string
    title:string
    content:string
    attachmentId?:string
    type:ArticleTypeEnum
    createdOn: Date,
    createdById: string
    updatedOn: Date
    deletedOn?: Date,
    deletedById?: string
}