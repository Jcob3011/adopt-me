import {AnimalBreedEnum} from "../AnimalBreedEnum";
import {AnimalTypeEnum} from "../AnimalTypeEnum";
import {AnimalColorEnum} from "../AnimalColorEnum";
import {AnimalHairEnum} from "../AnimalHairEnum";
import {AnimalSizeEnum} from "../AnimalSizeEnum";
import {ClientHealthBooklet} from "./ClientHealthBooklet";

export interface ClientAnimal{
    id:string
    name:string
    age:string
    attachmentId?:string
    tags:String[]
    breed:AnimalBreedEnum
    type:AnimalTypeEnum
    color:AnimalColorEnum
    hair:AnimalHairEnum
    size:AnimalSizeEnum
    town:string
    contact:string
    healthBooklet?: ClientHealthBooklet[]
}