import {ColumnType, DataTable, TableFilterType} from "../../../components/table/data-table/table/DataTable";
import {useTranslation} from "react-i18next";
import {api} from "../../../api";
import {SearchCriteria} from "../../../api/commons/search/SearchCriteria";
import {QueryOperator} from "../../../api/commons/search/QueryOperator";
import {TableFilterVariant} from "../../../components/table/data-table/filter/TableFilterVariant";
import {
    AnimalBreedOption, AnimalColorOption, AnimalHairOption, AnimalSizeOption, AnimalTypeOption,
    TagsOptions
} from "../../../utils/table/SelectFilterOptions";
import React, {SetStateAction, useEffect, useState} from "react";
import {DataTableCustomButton} from "../../../components/table/data-table/table-row/table-row/DataTableRow";
import IconButton from "@mui/material/IconButton";
import {Add} from "@mui/icons-material";
import classes from "./AnimalTableWithPickAction.module.css"
import Box from "@mui/system/Box/Box";
import {RoundedBox} from "../../../components/rounded-box/RoundedBox";
import {
    AnimalBreedTranslate, AnimalColorTranslate, AnimalHairTranslate, AnimalSizeTranslate, AnimalTypeTranslate,
} from "../../../providers/enum-translate-provider/Translations";
import {AnimalDto} from "../../../api/animal/response/AnimalDto";

type Props = {
    handleAddAnimal: (Animal: AnimalDto) => void
}

export const AnimalTableWithPickAction = ({handleAddAnimal,}: Props) => {
    const {t} = useTranslation()
    const [defaultFilters, setDefaultFilters] = useState<SearchCriteria[]>([])

        const columns: ColumnType<AnimalDto>[] = [
            {
                key: 'name',
                title: t(`types.animal.name`)
            },
            {
                key: 'age',
                title: t(`types.animal.age`)
            },
            {
                key: 'tags',
                title: t(`types.animal.tags`),
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
            {
                key: 'breed',
                title: t(`types.animal.breed`),
                enumTranslation: AnimalBreedTranslate
            },
            {
                key: 'type',
                title: t(`types.animal.type`),
                enumTranslation: AnimalTypeTranslate
            },
            {
                key: 'size',
                title: t(`types.animal.size`),
                enumTranslation: AnimalSizeTranslate
            },
            {
                key: 'color',
                title: t(`types.animal.color`),
                enumTranslation: AnimalColorTranslate
            },
            {
                key: 'hair',
                title: t(`types.animal.hair`),
                enumTranslation: AnimalHairTranslate
            }
        ]

        const filters: TableFilterType[] = [
            {
                field: 'name',
                variant: TableFilterVariant.TEXT,
                label: t(`types.animal.name`)
            },
            {
                field: 'age',
                variant: TableFilterVariant.TEXT,
                label: t(`types.animal.age`)
            },
            {
                field: 'breed',
                variant: TableFilterVariant.SELECT,
                label: t(`types.animal.breed`),
                selectOptions: AnimalBreedOption,
                enumTranslation: AnimalBreedTranslate
            },
            {
                field: 'type',
                variant: TableFilterVariant.SELECT,
                label: t(`types.animal.breed`),
                selectOptions: AnimalTypeOption,
                enumTranslation: AnimalTypeTranslate
            },
            {
                field: 'color',
                variant: TableFilterVariant.SELECT,
                label: t(`types.animal.color`),
                selectOptions: AnimalColorOption,
                enumTranslation: AnimalColorTranslate
            },
            {
                field: 'hair',
                variant: TableFilterVariant.SELECT,
                label: t(`types.animal.hair`),
                selectOptions: AnimalHairOption,
                enumTranslation: AnimalHairTranslate
            },
            {
                field: 'size',
                variant: TableFilterVariant.SELECT,
                label: t(`types.animal.size`),
                selectOptions: AnimalSizeOption,
                enumTranslation: AnimalSizeTranslate
            },
            {
                field: 'tags',
                variant: TableFilterVariant.SELECT,
                label: t(`types.tag.single`),
                selectOptionsPromise: TagsOptions,
                queryOperator: QueryOperator.CONTAINS
            }
        ]

        const customIconButtons: DataTableCustomButton<AnimalDto>[] = [
            (item, index) => {
                return (
                    <IconButton
                        key={`animal-table-add-icon-button-${index}`}
                        onClick={(event) => {
                            event.stopPropagation()
                            handleAddAnimal(item)
                        }
                        }>
                        <Add/>
                    </IconButton>
                )
            }
        ]

        // const dialog = (item: AnimalDto, open: boolean, setOpen: React.Dispatch<SetStateAction<boolean>>) => {
        //     return <CustomDialog
        //         title={item.name}
        //         content={<AnimalDisplayDialog animal={item}/>}
        //         open={open}
        //         hasCancelButton
        //         cancelButtonVariant='back'
        //         handleClose={() => setOpen(false)}/>
        // }

        return (
            <DataTable
                name={t(`pages.predefined.create.animalTable.name`)}
                columns={columns}
                search={api.animal.search}
                defaultFilters={defaultFilters}
                // dialog={dialog}
                // detailsType='dialog'
                customIconButtons={customIconButtons}
                filters={filters}
            />
        )
}