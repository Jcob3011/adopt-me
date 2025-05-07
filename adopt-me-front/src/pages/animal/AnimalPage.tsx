import {ColumnType, DataTable, TableFilterType} from "../../components/table/data-table/table/DataTable";
import {api} from "../../api";
import {TableFilterVariant} from "../../components/table/data-table/filter/TableFilterVariant";
import {useTranslation} from "react-i18next";
import "../../locales/translation";
import {QueryOperator} from "../../api/commons/search/QueryOperator";
import Box from "@mui/system/Box/Box";
import classes from "../../commons/table/animal-table-with-pick-action/AnimalTableWithPickAction.module.css";
import {RoundedBox} from "../../components/rounded-box/RoundedBox";
import React from "react";
import {TagsOptions} from "../../utils/table/SelectFilterOptions";
import {AnimalDto} from "../../api/animal/response/AnimalDto";
import {
    AnimalBreedTranslate,
    AnimalColorTranslate, AnimalHairTranslate, AnimalSizeTranslate,
    AnimalTypeTranslate
} from "../../providers/enum-translate-provider/Translations";
import {SelectOption} from "../../components/table/data-table/filter/variants/selectFilter/SelectFilterField";
import {AnimalType} from "./enum/AnimalType";
import {AnimalBreed} from "./enum/AnimalBreed";
import {AnimalColor} from "./enum/AnimalColor";
import {AnimalSize} from "./enum/AnimalSize";
import {AnimalHair} from "./enum/AnimalHair";

export const AnimalListPage = () => {
    const {t} = useTranslation()
    const typeOptions : SelectOption[] = [
        {
            value: AnimalType.CAT,
            id: AnimalType.CAT
        },
        {
            value: AnimalType.DOG,
            id: AnimalType.DOG
        }
    ]

    const breedOptions : SelectOption[] = [
        {
            value: AnimalBreed.YORK,
            id: AnimalBreed.YORK
        },
        {
            value: AnimalBreed.MALTANCZYK,
            id: AnimalBreed.MALTANCZYK
        },
        {
            value: AnimalBreed.OWCZAREK_NIEMIEKCI,
            id: AnimalBreed.OWCZAREK_NIEMIEKCI
        }
    ]

    const colorOptions : SelectOption[] =[
        {
            value: AnimalColor.BLACK,
            id: AnimalColor.BLACK
        },
        {
            value: AnimalColor.WHITE,
            id: AnimalColor.WHITE
        },
        {
            value: AnimalColor.BROWN,
            id: AnimalColor.BROWN
        }
    ]

    const sizeOptions : SelectOption[] =[
        {
            value: AnimalSize.LARGE,
            id: AnimalSize.LARGE
        },
        {
            value: AnimalSize.MEDIUM,
            id: AnimalSize.MEDIUM
        },
        {
            value: AnimalSize.SMALL,
            id: AnimalSize.SMALL
        }
    ]

    const hairOptions : SelectOption[] =[
        {
            value: AnimalHair.LONG,
            id: AnimalHair.LONG
        },
        {
            value: AnimalHair.MID,
            id: AnimalHair.MID
        },
        {
            value: AnimalHair.SHORTY,
            id: AnimalHair.SHORTY
        }
    ]

    const columns: ColumnType<AnimalDto>[] = [
        {
            key: 'tags',
            title: t("pages.animal.tags"),
            render: (column, item) => {
                return (
                    <Box
                        className={classes.tagsBox}>
                        {item.tags.map((tag, index) =>
                            <Box key={`tag-rounded-box-${tag.id}-${index}`}
                                 className={classes.tagBox}>
                                <RoundedBox
                                    label={tag.name}
                                    resize={true}
                                    key={`tag-rounded-box-${tag.id}-${index}`}
                                />
                            </Box>
                        )
                        }
                    </Box>
                )
            },
            disableSort: true
        },
    ];

    const filters: TableFilterType[] = [
        {
            field: "name",
            label: t("pages.animal.name"),
            variant: TableFilterVariant.TEXT,
        },
        {
            field: "age",
            label: t("pages.animal.age"),
            variant: TableFilterVariant.TEXT
        },
        {
            field: "type",
            label: t("pages.animal.type"),
            variant: TableFilterVariant.SELECT,
            selectOptions: typeOptions,
            enumTranslation: AnimalTypeTranslate
        },
        {
            field: "breed",
            label: t("pages.animal.breed"),
            variant: TableFilterVariant.SELECT,
            selectOptions: breedOptions,
            enumTranslation: AnimalBreedTranslate
        },
        {
            field: "color",
            label: t("pages.animal.color"),
            variant: TableFilterVariant.SELECT,
            selectOptions: colorOptions,
            enumTranslation: AnimalColorTranslate
        },
        {
            field: "hair",
            label: t("pages.animal.hair"),
            variant: TableFilterVariant.SELECT,
            selectOptions: hairOptions,
            enumTranslation: AnimalHairTranslate
        },
        {
            field: "size",
            label: t("pages.animal.size"),
            variant: TableFilterVariant.SELECT,
            selectOptions: sizeOptions,
            enumTranslation: AnimalSizeTranslate
        },
        {
            field: "tags",
            label: t("pages.animal.tags"),
            variant: TableFilterVariant.SELECT,
            selectOptionsPromise: TagsOptions,
            queryOperator: QueryOperator.CONTAINS
        },
        {
            field: "town",
            label: t("pages.animal.town"),
            variant: TableFilterVariant.TEXT,
        },
        {
            field: "contact",
            label: t("pages.animal.contact"),
            variant: TableFilterVariant.TEXT,
        },
    ]

    return <DataTable
        name={t("pages.animal.dataTableName")}
        columns={columns}
        filters={filters}
        defaultFilters={[{
            field: "deletedOn",
            operator: QueryOperator.IS_NULL
        }]}
        search={api.animal.search}
        detailsPath="/animal/details"
    />
}