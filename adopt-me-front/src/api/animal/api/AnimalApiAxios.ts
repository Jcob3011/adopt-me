import {AnimalApi} from "../AnimalApi";
import {AnimalDto} from "../response/AnimalDto";
import axiosClient from "../../config/AxiosClient";
import {AnimalSaveForm} from "../form/AnimalSaveForm";
import {AnimalUpdateForm} from "../form/AnimalUpdateForm";
import {AnimalBreedEnum} from "../AnimalBreedEnum";
import {AnimalColorEnum} from "../AnimalColorEnum";
import {AnimalHairEnum} from "../AnimalHairEnum";
import {AnimalSizeEnum} from "../AnimalSizeEnum";
import {AnimalTypeEnum} from "../AnimalTypeEnum";
import {SearchForm} from "../../commons/search/SearchForm";
import {SearchResponse} from "../../commons/search/SearchResponse";


export class AnimalApiAxios implements AnimalApi {

    getAllAnimal(animalId: string[], withDeleted: boolean): Promise<AnimalDto[]> {
        return axiosClient.post('/animal/all', animalId)
    }

    getAnimalById(id: string): Promise<AnimalDto> {
        return axiosClient.get(`/animal/${id}`)
    }

    getAnimalByBreed(breed: AnimalBreedEnum): Promise<AnimalDto> {
        return axiosClient.get(breed)
    }

    async getAnimalByColor(color: AnimalColorEnum): Promise<AnimalDto> {
        return await axiosClient.get(color)
    }

    async getAnimalByHair(hair: AnimalHairEnum): Promise<AnimalDto> {
        return await axiosClient.get(hair)
    }
    async getAnimalBySize(size: AnimalSizeEnum): Promise<AnimalDto> {
        return await axiosClient.get(size)
    }
    async getAnimalByType(type: AnimalTypeEnum): Promise<AnimalDto> {
        return await axiosClient.get(type)
    }

    saveAnimal(form: AnimalSaveForm): Promise<AnimalDto> {
        return axiosClient.post('/animal', form)
    }

    updateAnimal(form: AnimalUpdateForm, id: string): Promise<void> {
        return axiosClient.put(`/animal/${id}`, form)
    }

    deleteAnimal(id: string): Promise<void> {
        return axiosClient.delete(`/animal/${id}`)
    }

    search(form: SearchForm): Promise<SearchResponse<AnimalDto>> {
        return axiosClient.post('/animal/search', form)
    }

}