import {Box} from "@mui/material";
import {
    CollapseTableProps,
    ColumnType,
    DataTable,
    TableFilterType
} from "../../components/table/data-table/table/DataTable";
import {api} from "../../api";
import * as React from "react";
import {NotificationErrorDto} from "../../api/notification/response/NotificationErrorDto";
import {TableFilterVariant} from "../../components/table/data-table/filter/TableFilterVariant";
import {ValueType} from "../../types/ValueType";
import {Order} from "../../types/OrderType";
import {useTranslation} from "react-i18next";
import {SimpleColumnType} from "../../components/table/data-table/table-simple/SimpleTable";
import {RenderBooleanType} from "../../utils/table/RenderBooleanType";
import {Notification} from "../../api/notification/response/Notification";

export const NotificationErrors = () => {
    const {t} = useTranslation()

    const columns: ColumnType<NotificationErrorDto>[] = [
        {
            key: "id",
            title: t('pages.notification.table.columns.id')
        },
        {
            key: "errorMessage",
            title: t('pages.notification.table.columns.errorMessage')
        },
        {
            key: "occurredOn",
            title: t('pages.notification.table.columns.occurredOn'),
            sortByDefaultDirection: Order.DESC,
            type: ValueType.DATE
        },
    ];

    const filters: TableFilterType[] = [
        {
            field: "id",
            label: t('pages.notification.table.filters.id'),
            variant: TableFilterVariant.TEXT
        },
        {
            field: "errorMessage",
            label: t('pages.notification.table.filters.errorMessage'),
            variant: TableFilterVariant.TEXT
        },
        {
            field: "occurredOn",
            label: t('pages.notification.table.filters.occurredOn'),
            variant: TableFilterVariant.DATE
        }
    ]

    const collapseColumns: SimpleColumnType<Notification>[] = [
        {
            key: "id",
            title: t('pages.notification.table.collapse.columns.id')
        },
        {
            key: "email",
            title: t('pages.notification.table.collapse.columns.email')
        },
        {
            key: "sent",
            title: t('pages.notification.table.collapse.columns.sent'),
            render: (column, item) => <RenderBooleanType isTrue={item.sent}/>
        },
        {
            key: "attempts",
            title: t('pages.notification.table.collapse.columns.attempts')
        },
        {
            key: "createdOn",
            title: t('pages.notification.table.collapse.columns.createdOn'),
            type: ValueType.DATE
        }
    ]

    const collapseProps: CollapseTableProps<Notification> = {
        collapseTitle: t('pages.notification.table.collapse.name').toString(),
        collapseColumns: collapseColumns,
        collapseItemPath: "notification"
    }


    return (
        <Box>
            <Box>
                <DataTable
                    name={t('pages.notification.table.name')}
                    columns={columns}
                    filters={filters}
                    collapseTableProps={collapseProps}
                    detailsType='table'
                    search={api.notification.search}
                />
            </Box>
        </Box>
    )
}

