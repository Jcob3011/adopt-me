import {CollapseTableProps, ColumnType, TableDetailsType} from "../table/DataTable";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import {ReactElement, useEffect, useRef, useState} from "react";
import {DataTableCustomButton, DataTableRow} from "./table-row/DataTableRow";
import classes from "./TableRows.module.css"
import {get} from "lodash";
import {useTheme} from "@mui/material/styles";

type Props<T, R> = {
    data: T[]
    columns: ColumnType<T>[]
    detailsPath?: string
    collapseTableProps?: CollapseTableProps<R>
    emptyRowsNumber: number
    close: boolean
    customIconButtons?: DataTableCustomButton<T>[]
    dialog?: (item: T, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactElement
    detailsType?: TableDetailsType
}

export const TableRows = <T, R>({
                                    data,
                                    columns,
                                    detailsPath,
                                    emptyRowsNumber,
                                    customIconButtons,
                                    collapseTableProps,
                                    detailsType,
                                    dialog,
                                    close
                                }: Props<T, R>) => {
    const [height, setHeight] = useState(0)
    const ref = useRef<HTMLTableRowElement>(null);
    const theme = useTheme()

    useEffect(() => {
        const handleResize = () => {
            if (ref.current) {
                setHeight(ref.current.clientHeight);
            }
        };
        handleResize()
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [data]);

    return (
        <>
            {data.map((item, rowIndex) =>
                <DataTableRow
                    item={item}
                    rowRef={ref}
                    columns={columns}
                    close={close}
                    itemIndex={rowIndex}
                    dialog={dialog}
                    detailsType={detailsType}
                    customIconButtons={customIconButtons}
                    collapseColumns={collapseTableProps ? collapseTableProps.collapseColumns : undefined}
                    collapseData={collapseTableProps ? (collapseTableProps.collapseItemPath ? get(item, collapseTableProps.collapseItemPath) : undefined) : undefined}
                    collapseTitle={collapseTableProps ? collapseTableProps.collapseTitle : undefined}
                    detailsPath={detailsPath}
                    key={`table-body-row-${rowIndex}`}/>
            )}
            {emptyRowsNumber > 0 && (
                <TableRow
                    className={classes.tableRow}
                    sx={{'& > *': {borderBottom: `1px solid ${theme.palette.table.divider} !important`}
                    }}
                    style={{height: height * emptyRowsNumber}}>
                    <TableCell colSpan={12}/>
                </TableRow>
            )}
        </>
    )
}