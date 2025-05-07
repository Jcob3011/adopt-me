import '../../locales/translation'
import {Box} from "@mui/material";
import {ColumnType, DataTable, TableFilterType} from "../../components/table/data-table/table/DataTable";
import {api} from "../../api";
import * as React from "react";
import {TableFilterVariant} from "../../components/table/data-table/filter/TableFilterVariant";
import {TagDto} from "../../api/tag/response/TagDto";
import {SearchCriteria} from "../../api/commons/search/SearchCriteria";
import {QueryOperator} from "../../api/commons/search/QueryOperator";
import {useTranslation} from "react-i18next";

export const TagListPage = () => {
    const {t} = useTranslation()
    const defaultFilters: SearchCriteria[] = [
        {
            field: "deletedById",
            operator: QueryOperator.IS_NULL
        }
    ]
    const columns: ColumnType<TagDto>[] = [
        {
            key: "name",
            title: t('pages.TagListPage.tagNameTitle')
        }
    ];
    const filters: TableFilterType[] = [
        {
            field: "id",
            label: "Id",
            variant: TableFilterVariant.TEXT
        },
        {
            field: "name",
            label: t('pages.TagListPage.tagNameTitle'),
            variant: TableFilterVariant.TEXT
        },
    ]
    return (
        <Box>
            <Box>
                <DataTable
                    name={t('pages.TagListPage.profileTitle')}
                    columns={columns}
                    filters={filters}
                    defaultFilters={defaultFilters}
                    detailsPath={`http://localhost:3000/tags/details`}
                    search={api.tag.search}
                />
            </Box>
        </Box>
    )
}