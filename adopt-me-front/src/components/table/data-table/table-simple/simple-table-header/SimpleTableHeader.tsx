import {TableHead} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {SimpleColumnType} from "../SimpleTable";
import TableCell from "@mui/material/TableCell";
import {useTheme} from "@mui/material/styles";

type Props<T> = {
    columns: SimpleColumnType<T>[]
}

export const SimpleTableHeader = <T, >({columns}: Props<T>) => {
    const theme = useTheme()

    return (
        <TableHead>
            <TableRow sx={{
                '& > *': {borderBottom: `1px solid ${theme.palette.table.simpleTable.divider} !important`}
            }}>
                {columns.map((column,index) =>
                    <TableCell key={`${column.key}-${index}`}>
                        {column.title}
                    </TableCell>
                )}
            </TableRow>
        </TableHead>
    )
}