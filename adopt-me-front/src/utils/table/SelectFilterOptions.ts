import {SelectOption} from "../../components/table/data-table/filter/variants/selectFilter/SelectFilterField";
import {api} from "../../api";
import {QueryOperator} from "../../api/commons/search/QueryOperator";

export const UsersOptions = async () => {
    let users: SelectOption[] = []
    api.userAccount.search({
        sort: {
            direction: 'ASC',
            by: 'firstName'
        },
        size: 99999,
        page: 0
    }).then(value => value.items.forEach(user => users.push({
        value: user.firstName + ' ' + user.lastName,
        id: user.id
    })))

    return users;
}
export const TagsOptions = async (): Promise<SelectOption[]> => {
    return api.tag.search({
        sort: {
            direction: 'ASC',
            by: 'name'
        },
        criteria: [{
            field: 'deletedById',
            operator: QueryOperator.IS_NULL
        }],
        size: 99999,
        page: 0
    }).then(value => value.items.map(tag => {
        const selectOption: SelectOption = {
            value: tag.name,
            id: tag.id
        }
        return selectOption
    }))
}


export const ArticleTypeOption: SelectOption[]=
    [
        {
            value:'ZDROWIE',
            id:'ZDROWIE'
        }
    ]

export const AnimalBreedOption: SelectOption[] =
    [
        {
            value: 'MALTANCZYK',
            id: 'MALTANCZYK'
        },
        {
            value: 'OWCZAREK_NIEMIECKI',
            id: 'OWCZAREK_NIEMIECKI'
        },
        {
            value: 'YORK',
            id: 'YORK'
        },
    ]

export const AnimalTypeOption: SelectOption[] =
    [
        {
            value: 'DOG',
            id: 'DOG'
        },
        {
            value: 'CAT',
            id: 'CAT'
        },
    ]

export const AnimalColorOption: SelectOption[] =
    [
        {
            value: 'BLACK',
            id: 'BLACK'
        },
        {
            value: 'BROWN',
            id: 'BROWN'
        },
        {
            value: 'WHITE',
            id: 'WHITE'
        },
    ]

export const AnimalSizeOption: SelectOption[] =
    [
        {
            value: 'LARGE',
            id: 'LARGE'
        },
        {
            value: 'MEDIUM',
            id: 'MEDIUM'
        },
        {
            value: 'SMALL',
            id: 'SMALL'
        },
    ]

export const AnimalHairOption: SelectOption[] =
    [
        {
            value: 'LONG',
            id: 'LONG'
        },
        {
            value: 'MID',
            id: 'MID'
        },
        {
            value: 'SHORTY',
            id: 'SHORTY'
        },
    ]