import {ColumnType, DataTable, TableFilterType} from "../../components/table/data-table/table/DataTable";
import {api} from "../../api";
import {TableFilterVariant} from "../../components/table/data-table/filter/TableFilterVariant";
import {useTranslation} from "react-i18next";
import "../../locales/translation";
import {SelectOption} from "../../components/table/data-table/filter/variants/selectFilter/SelectFilterField";
import {QueryOperator} from "../../api/commons/search/QueryOperator";
import {
    ArticleTypeTranslate,
} from "../../providers/enum-translate-provider/Translations";
import React from "react";
import {ArticleType} from "./enum/ArticleType";
import {ArticleDto} from "../../api/article/response/ArticleDto";

export const ArticleListPage = () => {
    const {t} = useTranslation()
    const typeOptions: SelectOption[] = [
        {
            value: ArticleType.ZDROWIE,
            id: ArticleType.ZDROWIE
        }
    ]

    const columns: ColumnType<ArticleDto>[] = [
        {
            key: "title",
            title: t("pages.article.title")
        },
        {
            key: "content",
            title: t("pages.article.content")
        },
        {
            key: "type",
            title: t("pages.article.type"),
            enumTranslation: ArticleTypeTranslate
        },
    ];

    const filters: TableFilterType[] = [
        {
            field: "title",
            label: t("pages.article.title"),
            variant: TableFilterVariant.TEXT,
        },
        {
            field: "content",
            label: t("pages.article.content"),
            variant: TableFilterVariant.TEXT
        },
        {
            field: "type",
            label: t("pages.article.type"),
            variant: TableFilterVariant.SELECT,
            selectOptions: typeOptions,
            enumTranslation: ArticleTypeTranslate
        },
    ]

    return <DataTable
        name={t("pages.article.dataTableName")}
        columns={columns}
        filters={filters}
        defaultFilters={[{
            field: "deletedOn",
            operator: QueryOperator.IS_NULL
        }]}
        search={api.article.search}
        detailsPath="/article/details"
    />
}