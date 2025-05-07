import {api} from "../../api";
import {UserAccountDto} from "../../api/user-account/response/UserAccountDto";
import {TableFilterVariant} from "../../components/table/data-table/filter/TableFilterVariant";
import {useTranslation} from "react-i18next";
import {ColumnType, DataTable, TableFilterType} from "../../components/table/data-table/table/DataTable";
import {SelectOption} from "../../components/table/data-table/filter/variants/selectFilter/SelectFilterField";
import {QueryOperator} from "../../api/commons/search/QueryOperator";
import {
    UserAccountRoleTranslate,
    UserAccountStatusTranslate
} from "../../providers/enum-translate-provider/Translations";

export const Users = () => {

    const {t} = useTranslation()
    const roleOptions: SelectOption[] = [
        {
            value: "ADMIN",
            id: "ADMIN"
        },
        {
            value: "USER",
            id: "USER"
        }
    ]

    const statusOptions: SelectOption[] = [
        {
            value: "ACTIVE",
            id: "ACTIVE"
        },
        {
            value: "INACTIVE",
            id: "INACTIVE"
        },
        {
            value: "DELETED",
            id: "DELETED"
        }
    ]

    const columns: ColumnType<UserAccountDto>[] = [
        {
            key: "firstName",
            title: t("pages.users.table.firstName"),
        },
        {
            key: "lastName",
            title: t("pages.users.table.lastName"),
        },
        {
            key: "email",
            title: t("pages.users.table.email"),
        },
        {
            key: "role",
            title: t("pages.users.table.role"),
            enumTranslation: UserAccountRoleTranslate
        },
        {
            key: "status",
            title: t("pages.users.table.status"),
            enumTranslation: UserAccountStatusTranslate
        }
    ]

    const filters: TableFilterType[] = [
        {
            field: "firstName",
            label: t("pages.users.table.firstName"),
            variant: TableFilterVariant.TEXT
        },
        {
            field: "lastName",
            label: t("pages.users.table.lastName"),
            variant: TableFilterVariant.TEXT
        },
        {
            field: "email",
            label: t("pages.users.table.email"),
            variant: TableFilterVariant.TEXT
        },
        {
            field: "role",
            label: t("pages.users.table.role"),
            variant: TableFilterVariant.SELECT,
            selectOptions: roleOptions
        },
        {
            field: "status",
            label: t("pages.users.table.status"),
            variant: TableFilterVariant.SELECT,
            selectOptions: statusOptions
        }
    ]

    return <DataTable
        name={t("pages.users.table.label")}
        columns={columns}
        filters={filters}
        detailsPath="/users/details"
        defaultFilters={[
            {
                field: "status",
                operator: QueryOperator.NOT_EQUALS,
                value: "DELETED"
            }
        ]}
        search={api.userAccount.search}
    />
}