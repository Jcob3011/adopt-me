import {ColumnType} from "../../../table/DataTable";
import TableCell from "@mui/material/TableCell";
import {get} from "lodash";
import classes from "./TableRowCell.module.css"
import {useFormatData} from "../../../../../../utils/format/useFormatData";
import {useTheme} from "@mui/material/styles";

type Props<T> = {
    item: T
    column: ColumnType<T>
    index: number
}


export const TableRowCell = <T, >({item, column, index}: Props<T>) => {
    const theme = useTheme()
    const value = get(item, column.key) ? get(item, column.key) : undefined
    const formattedValue = useFormatData(value, column.type, column.enumTranslation)
    return (
        <TableCell
            key={`${column.title}-${index}`}
            className={classes.tableRowCell}
            style={{
                color: theme.palette.table.text
            }}

        >
            {column.render ? column.render(column, item) : formattedValue}
        </TableCell>
    )
}