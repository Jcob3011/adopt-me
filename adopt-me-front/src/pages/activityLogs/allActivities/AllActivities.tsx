import {api} from "../../../api";
import {useTranslation} from "react-i18next";
import {RoutePath} from "../../../router/RoutePath";
import {ColumnType, DataTable, TableFilterType} from "../../../components/table/data-table/table/DataTable";
import {detailsPathWithoutId} from "../../../utils/router/RouterUtils";
import {ActivityDto} from "../../../api/activity/response/ActivityDto";
import {ValueType} from "../../../types/ValueType";
import {TableFilterVariant} from "../../../components/table/data-table/filter/TableFilterVariant";
import {ActivityTypeTranslate} from "../../../providers/enum-translate-provider/Translations";

export const AllActivities = () => {
    const {t} = useTranslation()

    const activityLogsTableColumns: ColumnType<ActivityDto>[] = [

        {
            key: 'id',
            title: t('pages.activityLogs.id')
        },
        {
            key: 'description',
            title: t('pages.activityLogs.description')
        },
        {
            key: 'createdOn',
            title: t('pages.activityLogs.createdOn'),
            type: ValueType.DATE
        },
        {
            key: 'createdById',
            title: t('pages.activityLogs.createdById')
        },
        {
            key: 'type',
            title: t('pages.activityLogs.type'),
            enumTranslation: ActivityTypeTranslate
        }
    ]

    const activityLogsTableFilters: TableFilterType[] = [
        {
            field: 'id',
            label: t('pages.activityLogs.id'),
            variant: TableFilterVariant.TEXT
        },
        {
            field: 'description',
            label: t('pages.activityLogs.description'),
            variant: TableFilterVariant.TEXT
        },
        {
            field: 'createdOn',
            label: t('pages.activityLogs.createdOn'),
            variant: TableFilterVariant.DATE
        },
        {
            field: 'createdById',
            label: t('pages.activityLogs.createdById'),
            variant: TableFilterVariant.TEXT
        },
        {
            field: 'type',
            label: t('pages.activityLogs.type'),
            variant: TableFilterVariant.TEXT
        }
    ]

    return (
        <DataTable
            name={t('pages.activityLogs.all.name')}
            columns={activityLogsTableColumns}
            filters={activityLogsTableFilters}
            search={api.activity.search}
            detailsPath={detailsPathWithoutId(RoutePath.ACTIVITY_LOGS_DETAILS)}
        />
    )
}

