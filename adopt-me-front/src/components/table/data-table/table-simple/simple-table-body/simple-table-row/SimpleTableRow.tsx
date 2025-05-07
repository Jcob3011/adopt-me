import TableRow from "@mui/material/TableRow";
import {SimpleTableCell} from "./simple-table-cell/SimpleTableCell";
import {SimpleColumnType} from "../../SimpleTable";
import {useTheme} from "@mui/material/styles";

type Props<T> = {
    columns: SimpleColumnType<T>[]
    item: T
    grandparentRowIndex: number
    itemIndex: number
}
export const SimpleTableRow = <T,>({columns, item, itemIndex, grandparentRowIndex}: Props<T>) => {
    const theme = useTheme()

    return (
        <TableRow sx={{
            '& > *': {borderBottom: `1px solid ${theme.palette.table.simpleTable.divider} !important`}
        }}>
            {columns.map((column, colIndex) =>
                <SimpleTableCell
                    key={`simple-table-body-cell-${grandparentRowIndex}-${itemIndex}-${colIndex}`}
                    column={column}
                    item={item}
                />
            )}
        </TableRow>
    )
}