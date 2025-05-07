import Table from "@mui/material/Table";
import {SimpleTableHeader} from "./simple-table-header/SimpleTableHeader";
import TableContainer from "@mui/material/TableContainer";
import {ValueType} from "../../../../types/ValueType";
import * as React from "react";
import {SimpleTableBody} from "./simple-table-body/SimpleTableBody";
import {SimpleTableTitle} from "./simple-table-title/SimpleTableTitle";
import {Paper} from "@mui/material";
import classes from "./SimpleTable.module.css"
import {TranslationKeyValue} from "../../../../providers/enum-translate-provider/EnumTranslateProvider";
import {useTheme} from "@mui/material/styles";

export type SimpleColumnType<T> = {
    key: string
    title: string
    type?: ValueType
    render?: (column: SimpleColumnType<T>, item: T) => React.ReactElement
    enumTranslation?: TranslationKeyValue
}

type Props<T> = {
    columns: SimpleColumnType<T>[]
    data: T[]
    parentIndex: number
    title: string
}

export const SimpleTable = <T, >({columns, parentIndex, data, title}: Props<T>) => {
    const theme = useTheme()

    return (
        <Paper className={classes.paper}
               elevation={2}
               style={{
                   backgroundColor: theme.palette.background.default
               }}>
            <TableContainer>
                <SimpleTableTitle title={title}/>
                <Table>
                    <SimpleTableHeader columns={columns}/>
                    <SimpleTableBody columns={columns} data={data} parentIndex={parentIndex}/>
                </Table>
            </TableContainer>
        </Paper>
    )
}