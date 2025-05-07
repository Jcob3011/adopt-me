import Table from "@mui/material/Table";
import {Divider, LinearProgress, MenuItem, Pagination, Select, TableHead} from "@mui/material";
import {TableHeader} from "../table-header/TableHeader";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import {TableRows} from "../table-row/TableRows";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import {ReactElement, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {TableFilterVariant} from "../filter/TableFilterVariant";
import {SelectOption} from "../filter/variants/selectFilter/SelectFilterField";
import {ValueType} from "../../../../types/ValueType";
import {SearchSort} from "../../../../api/commons/search/SearchSort";
import {SearchCriteria} from "../../../../api/commons/search/SearchCriteria";
import {SearchResponse} from "../../../../api/commons/search/SearchResponse";
import {SearchForm} from "../../../../api/commons/search/SearchForm";
import {Order} from "../../../../types/OrderType";
import classes from "./DataTable.module.css"
import {SimpleColumnType} from "../table-simple/SimpleTable";
import {DataTableCustomButton} from "../table-row/table-row/DataTableRow";
import {TranslationKeyValue} from "../../../../providers/enum-translate-provider/EnumTranslateProvider";
import {QueryOperator} from "../../../../api/commons/search/QueryOperator";
import {useTheme} from "@mui/material/styles";
import {TableTitle} from "../table-title/TableTitle";

type Props<T, R> = {
    name: string
    columns: ColumnType<T>[]
    filters?: TableFilterType[]
    defaultFilters?: SearchCriteria[]
    detailsPath?: string
    customIconButtons?: DataTableCustomButton<T>[]
    search: ((form: SearchForm) => Promise<SearchResponse<T>>)
    detailsType?: TableDetailsType
    collapseTableProps?: CollapseTableProps<R>
    dialog?: (item: T, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactElement
}

export type TableDetailsType = 'table' | 'dialog'

export type ColumnType<T> = {
    key: string
    title: string
    type?: ValueType
    render?: (column: ColumnType<T>, item: T) => ReactElement
    sortByDefaultDirection?: Order
    enumTranslation?: TranslationKeyValue
    disableSort?: boolean
}

export type TableFilterType = {
    field: string
    label: string
    variant: TableFilterVariant
    selectOptionsPromise?: () => Promise<SelectOption[]>
    selectOptions?: SelectOption[]
    enumTranslation?: TranslationKeyValue
    queryOperator?: QueryOperator
}

export type CollapseTableProps<R> = {
    collapseColumns?: SimpleColumnType<R>[]
    collapseItemPath?: string
    collapseTitle?: string
}

export const DataTable = <T, R>({
                                    name,
                                    columns,
                                    filters,
                                    detailsPath,
                                    customIconButtons,
                                    search,
                                    defaultFilters,
                                    collapseTableProps,
                                    detailsType,
                                    dialog
                                }: Props<T, R>) => {
    const [data, setData] = useState<T[]>([])
    const [page, setPage] = useState(0)
    const [pageAmount, setPageAmount] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [emptyRows, setEmptyRows] = useState(0)
    const [progress, setProgress] = useState(true)
    const [searchCriteria, setSearchCriteria] = useState<SearchCriteria[] | undefined>()
    const [closeInnerTable, setCloseInnerTable] = useState(false)
    const [orderBy, setOrderBy] = useState<string | null>(() => {
        const column = columns.find(column => column.sortByDefaultDirection);
        return column?.key ?? null;
    });
    const [order, setOrder] = useState<Order>(() => {
        const column = columns.find(column => column.sortByDefaultDirection);
        return (column && column.sortByDefaultDirection) || Order.ASC;
    });
    const theme = useTheme()

    let sort: SearchSort;
    if (orderBy) {
        sort = {
            by: orderBy,
            direction: order.toUpperCase()
        }
    }

    useEffect(() => {
        search({
            criteria: defaultFilters ? defaultFilters.concat(searchCriteria ? searchCriteria : []) : searchCriteria,
            page: page,
            size: rowsPerPage,
            sort: sort === null ? undefined : sort
        }).then(response => {
            setCloseInnerTable(prevState => !prevState)
            setData(response.items);
            setPageAmount(Math.ceil(response.total / rowsPerPage))
            setEmptyRows(page > 0 ? rowsPerPage - response.items.length : 0)
            setProgress(false)
        })
    }, [page, rowsPerPage, orderBy, order, searchCriteria, search, defaultFilters])

    useEffect(() => {
        setPage(0)
    }, [searchCriteria, rowsPerPage])

    const handleRowCountChange = (newRowsPerPage: number) => {
        if (rowsPerPage !== newRowsPerPage) {
            setProgress(true)
        }
        setRowsPerPage(newRowsPerPage)
        setPage(0)
    }

    const handleChangePage = (newPage: number) => {
        if (newPage !== page) {
            setProgress(true)
        }
        setPage(newPage)
    }

    const handleSortRequest = (newOrderBy: string) => {
        setProgress(true)
        if (orderBy !== newOrderBy) {
            setOrder(Order.DESC)
        } else {
            setOrder(prevState => {
                return prevState === Order.DESC ? Order.ASC : Order.DESC
            })
        }
        setOrderBy(newOrderBy)
    }

    return (
        <>
            <TableContainer component={Paper}
                            sx={{
                                backgroundColor: `${theme.palette.paper.secondary} !important`
                            }}
                            className={classes.tableContainer}>
                <TableTitle name={name} filters={filters} setSearchCriteria={setSearchCriteria}/>
                <Divider className={classes.divider} sx={{
                    borderColor: theme.palette.table.divider
                }}/>
                <Box className={classes.progressBarBox}>
                    {progress && <LinearProgress/>}
                </Box>
                <Table>
                    <TableHead>
                        <TableHeader
                            columns={columns}
                            detailsPath={detailsPath}
                            customIconButtons={customIconButtons}
                            order={order}
                            orderBy={orderBy}
                            handleSortRequest={handleSortRequest}
                        />
                    </TableHead>
                    <TableBody>
                        <TableRows
                            data={data}
                            columns={columns}
                            collapseTableProps={collapseTableProps}
                            detailsType={detailsType}
                            dialog={dialog}
                            detailsPath={detailsPath}
                            customIconButtons={customIconButtons}
                            emptyRowsNumber={emptyRows}
                            close={closeInnerTable}
                        />
                    </TableBody>
                </Table>
                <Box className={classes.paginationBox}>
                    <Box className={classes.paginationInnerBox}>
                        <Pagination
                            count={pageAmount}
                            color='primary'
                            style={{
                                color: 'red'
                            }}
                            page={page + 1}
                            onChange={(_, page) => handleChangePage(page - 1)}
                        />
                    </Box>
                    <Box className={classes.paginationInnerBox}>
                        <Select
                            value={rowsPerPage}
                            label="Rows"
                            sx={{
                                '.MuiOutlinedInput-notchedOutline': {border: 'none'}
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        bgcolor: theme.palette.table.background,
                                    }
                                }
                            }}
                        >
                            <MenuItem value={5} onClick={() => handleRowCountChange(5)}>5 Rows</MenuItem>
                            <MenuItem value={10} onClick={() => handleRowCountChange(10)}>10 Rows</MenuItem>
                            <MenuItem value={20} onClick={() => handleRowCountChange(20)}>20 Rows</MenuItem>
                            <MenuItem value={30} onClick={() => handleRowCountChange(30)}>30 Rows</MenuItem>
                        </Select>
                    </Box>
                </Box>
            </TableContainer>
        </>
    )
}