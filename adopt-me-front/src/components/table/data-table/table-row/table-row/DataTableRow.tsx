import TableRow from "@mui/material/TableRow";
import classes from "./DataTableRow.module.css";
import {TableRowCell} from "./table-row-cell/TableRowCell";
import TableCell from "@mui/material/TableCell";
import {Collapse, Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Link} from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as React from "react";
import {ReactElement, useEffect, useState} from "react";
import {ColumnType, TableDetailsType} from "../../table/DataTable";
import {SimpleColumnType, SimpleTable} from "../../table-simple/SimpleTable";
import {useTheme} from "@mui/material/styles";

export type DataTableCustomButton<T> = (item: T, index: number) => React.ReactElement

type Props<T, R> = {
    item: T
    columns: ColumnType<T>[]
    collapseColumns?: SimpleColumnType<R>[]
    collapseData?: R[]
    collapseTitle?: string
    rowRef: React.RefObject<HTMLTableRowElement>
    detailsPath?: string
    itemIndex: number
    close: boolean
    customIconButtons?: DataTableCustomButton<T>[]
    dialog?: (item: T, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactElement
    detailsType?: TableDetailsType
}

function hasId(object: unknown): object is IdDataType {
    return Object.prototype.hasOwnProperty.call(object, "id")
}

type IdDataType = {
    id: string
}

export const DataTableRow = <T, R>({
                                       item, columns, rowRef, detailsPath, collapseColumns,
                                       collapseTitle, itemIndex, collapseData, close, customIconButtons, detailsType,
                                       dialog,
                                   }: Props<T, R>) => {
    const [open, setOpen] = useState(false)
    const theme = useTheme()

    useEffect(() => {
        setOpen(false)
    }, [close])

    const setOpenIfDetailsExist = () => {
        if (detailsType) {
            setOpen(!open)
        }
    }
    const preparePath = (detailsPath: string, id: string): string => {
        if (detailsPath.endsWith("/")) {
            return `${detailsPath}${id}`
        }
        return `${detailsPath}/${id}`
    }

    return (
        <React.Fragment>
            <TableRow
                onClick={() => setOpenIfDetailsExist()}
                ref={rowRef}
                className={classes.test}
                sx={{
                    ...(open ? {'& > *': {borderBottom: 'unset'}} : {'& > *': {borderBottom: `1px solid ${theme.palette.table.divider} !important`}}),
                    ...(detailsType ? {cursor: 'pointer'} : {}),
                    ...({':hover' : {
                            backgroundColor: theme.palette.table.rowHover
                        }})
                }}
            >
                {columns.map((column, cellIndex) => (
                    <TableRowCell
                        key={`table-body-cell-${cellIndex}-${column.key}-${column.title}`}
                        index={cellIndex}
                        column={column}
                        item={item}/>
                ))}
                {hasId(item) &&
                    (detailsPath || customIconButtons) &&
                    <TableCell className={classes.tableRowCell}>
                        <Stack direction='row' className={classes.actionIconStack}>
                            {detailsPath &&
                                <IconButton component={Link} to={preparePath(detailsPath, item.id)}
                                            onClick={(event) => event.stopPropagation()}>
                                    <VisibilityIcon color='primary'/>
                                </IconButton>
                            }
                            {
                                customIconButtons && customIconButtons
                                    .map((iconButton, index) => iconButton(item, index))
                            }
                        </Stack>
                    </TableCell>
                }
            </TableRow>
            {(collapseColumns && detailsType === 'table') &&
                <TableRow>
                    <TableCell
                        className={classes.tableCollapseCell}
                        sx={open ? {'& > *': {borderBottom: `1px solid ${theme.palette.table.divider} !important`}} : {borderBottom: 'none'}}
                        colSpan={12}>
                        <Collapse in={open} timeout="auto" className={classes.collapse} unmountOnExit>
                            <SimpleTable
                                columns={collapseColumns}
                                data={collapseData!}
                                parentIndex={itemIndex}
                                title={collapseTitle!}
                            />
                        </Collapse>
                    </TableCell>
                </TableRow>
            }
            {(dialog && detailsType === 'dialog') &&
                dialog(item, open, setOpen)
            }
        </React.Fragment>
    )
}
