import {SearchApi} from "../commons/search/SearchApi";
import {AnimalDto} from "./response/AnimalDto";
import {AnimalSaveForm} from "./form/AnimalSaveForm";
import {AnimalUpdateForm} from "./form/AnimalUpdateForm";
import {AnimalTypeEnum} from "./AnimalTypeEnum";
import {AnimalBreedEnum} from "./AnimalBreedEnum";
import {AnimalColorEnum} from "./AnimalColorEnum";
import {AnimalHairEnum} from "./AnimalHairEnum";
import {AnimalSizeEnum} from "./AnimalSizeEnum";

export interface AnimalApi extends SearchApi<AnimalDto>{

    getAllAnimal(id: string[], withDeleted: boolean): Promise<AnimalDto[]>

    getAnimalById(id:string): Promise<AnimalDto>

    getAnimalByType(type:AnimalTypeEnum): Promise<AnimalDto>

    getAnimalByBreed(type:AnimalBreedEnum): Promise<AnimalDto>

    getAnimalByColor(type:AnimalColorEnum): Promise<AnimalDto>

    getAnimalByHair(type:AnimalHairEnum): Promise<AnimalDto>

    getAnimalBySize(type:AnimalSizeEnum): Promise<AnimalDto>

    saveAnimal(form:AnimalSaveForm): Promise <AnimalDto>

    updateAnimal(form:AnimalUpdateForm, id: string): Promise <void>

    deleteAnimal(id:string): Promise<void>

}