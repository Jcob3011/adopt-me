import {ColumnType, DataTable, TableFilterType} from "../../../components/table/data-table/table/DataTable";
import {useTranslation} from "react-i18next";
import {api} from "../../../api";
import {SearchCriteria} from "../../../api/commons/search/SearchCriteria";
import {QueryOperator} from "../../../api/commons/search/QueryOperator";
import {TableFilterVariant} from "../../../components/table/data-table/filter/TableFilterVariant";
import {
    AnimalBreedOption, AnimalColorOption, AnimalHairOption, AnimalSizeOption, AnimalTypeOption, ArticleTypeOption,
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
    AnimalBreedTranslate,
    AnimalColorTranslate,
    AnimalHairTranslate,
    AnimalSizeTranslate,
    AnimalTypeTranslate,
    ArticleTypeTranslate,
} from "../../../providers/enum-translate-provider/Translations";
import {AnimalDto} from "../../../api/animal/response/AnimalDto";
import {ArticleDto} from "../../../api/article/response/ArticleDto";

type Props = {
    handleAddArticle: (Article: ArticleDto) => void
}

export const ArticleTableWithPickAction = ({handleAddArticle,}: Props) => {
    const {t} = useTranslation()
    const [defaultFilters, setDefaultFilters] = useState<SearchCriteria[]>([])

    const columns: ColumnType<ArticleDto>[] = [
        {
            key: 'title',
            title: t(`types.article.title`)
        },
        {
            key: 'content',
            title: t(`types.article.content`)
        },
        {
            key: 'type',
            title: t(`types.article.type`),
            enumTranslation: ArticleTypeTranslate
        },
    ]

    const filters: TableFilterType[] = [
        {
            field: 'title',
            variant: TableFilterVariant.TEXT,
            label: t(`types.article.title`)
        },
        {
            field: 'content',
            variant: TableFilterVariant.TEXT,
            label: t(`types.article.content`)
        },
        {
            field: 'type',
            variant: TableFilterVariant.SELECT,
            label: t(`types.article.type`),
            selectOptions: ArticleTypeOption,
            enumTranslation: ArticleTypeTranslate
        },
    ]

    const customIconButtons: DataTableCustomButton<ArticleDto>[] = [
        (item, index) => {
            return (
                <IconButton
                    key={`animal-table-add-icon-button-${index}`}
                    onClick={(event) => {
                        event.stopPropagation()
                        handleAddArticle(item)
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
            name={t(`pages.predefined.create.articleTable.name`)}
            columns={columns}
            search={api.article.search}
            defaultFilters={defaultFilters}
            // dialog={dialog}
            // detailsType='dialog'
            customIconButtons={customIconButtons}
            filters={filters}
        />
    )
}