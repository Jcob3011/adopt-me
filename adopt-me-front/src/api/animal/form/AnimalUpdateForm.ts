import {HealthBookletForm} from "./HealthBookletForm";

export interface AnimalUpdateForm{
    name:string
    age:string
    type:string
    breed:string
    color:string
    hair:string
    size:string
    tags:string[]
    town:string
    contact:string
    healthBooklet:HealthBookletForm[]
    attachmentId?: string
    optionsToDelete?:string[]
}