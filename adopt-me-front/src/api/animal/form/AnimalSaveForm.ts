import {HealthBookletForm} from "./HealthBookletForm";

export interface AnimalSaveForm{
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
    attachmentId?: string
    healthBooklet:HealthBookletForm[]
}