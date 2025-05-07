import {TagDto} from "../../tag/response/TagDto";
import {HealthBookletDto} from "./HealthBookletDto";
import {AnimalSizeEnum} from "../AnimalSizeEnum";
import {AnimalColorEnum} from "../AnimalColorEnum";
import {AnimalBreedEnum} from "../AnimalBreedEnum";
import {AnimalTypeEnum} from "../AnimalTypeEnum";
import {AnimalHairEnum} from "../AnimalHairEnum";

export interface AnimalDto{
    id:string
    name:string
    age:string
    attachmentId?: string
    tags:TagDto[]
    type:AnimalTypeEnum
    breed:AnimalBreedEnum
    color:AnimalColorEnum
    hair:AnimalHairEnum
    size:AnimalSizeEnum
    town:string
    contact:string
    healthBooklet?:HealthBookletDto[]
    createdOn: Date,
    createdById: string
    updatedOn: Date
    deletedOn?: Date,
    deletedById?: string
}