import {useContext} from "react";
import {AuthContext, AuthContextType} from "../../../providers/auth-provider/AuthProvider";
import {SearchCriteria} from "../../../api/commons/search/SearchCriteria";
import {QueryOperator} from "../../../api/commons/search/QueryOperator";
import {api} from "../../../api";
import {useTranslation} from "react-i18next";
import {ColumnType, DataTable, TableFilterType} from "../../../components/table/data-table/table/DataTable";
import {detailsPathWithoutId} from "../../../utils/router/RouterUtils";
import {RoutePath} from "../../../router/RoutePath";
import {TableFilterVariant} from "../../../components/table/data-table/filter/TableFilterVariant";
import {ActivityDto} from "../../../api/activity/response/ActivityDto";
import {ValueType} from "../../../types/ValueType";
import {ActivityTypeTranslate} from "../../../providers/enum-translate-provider/Translations";

export const MyActivities = () => {
    const {loggedUser} = useContext<AuthContextType>(AuthContext)
    const {t} = useTranslation()

    const defaultFilters: SearchCriteria[] = [
        {
            field: 'createdById',
            operator: QueryOperator.EQUALS,
            value: loggedUser?.id
        }
    ]

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

    const myActivityLogsTableFilters: TableFilterType[] = [
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
            field: 'type',
            label: t('pages.activityLogs.type'),
            variant: TableFilterVariant.TEXT
        }
    ]

    return (
        <DataTable
            name={t('pages.activityLogs.my.name')}
            columns={activityLogsTableColumns}
            filters={myActivityLogsTableFilters}
            search={api.activity.search}
            detailsPath={detailsPathWithoutId(RoutePath.ACTIVITY_LOGS_DETAILS)}
            defaultFilters={defaultFilters}
        />
    )
}

