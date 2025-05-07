import {ColumnType} from "../table/DataTable";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableSortLabel from "@mui/material/TableSortLabel";
import {visuallyHidden} from '@mui/utils';
import {Box} from "@mui/material";
import {Order} from "../../../../types/OrderType";
import classes from "./TableHeader.module.css"
import {DataTableCustomButton} from "../table-row/table-row/DataTableRow";
import {useTheme} from "@mui/material/styles";

type Props<T> = {
    columns: ColumnType<T>[]
    detailsPath?: string
    customIconButtons?: DataTableCustomButton<T>[]
    order: Order
    orderBy: string | null
    handleSortRequest: (newOrderBy: string) => void
}

export const TableHeader = <T, >({
                                     columns,
                                     detailsPath,
                                     customIconButtons,
                                     order,
                                     orderBy,
                                     handleSortRequest
                                 }: Props<T>) => {
    const theme = useTheme()

    return (
        <TableRow sx={{
            ...({'& > *': {borderBottom: `1px solid ${theme.palette.table.divider} !important`}})
        }}>
            {columns.map((column, index) =>
                <TableCell
                    key={`table-head-cell-${index}`}
                    sortDirection={orderBy === column.key ? order : false}
                >
                    <TableSortLabel
                        disabled={column.disableSort}
                        active={orderBy === column.key}
                        direction={orderBy === column.key ? order : Order.DESC}
                        onClick={_ => handleSortRequest(column.key)}>
                        <Typography className={classes.textFontWeight}
                                    style={{
                                        color: theme.palette.table.text
                                    }}
                        >
                            {column.title}
                        </Typography>
                        {orderBy === column.key ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            )}
            {(detailsPath || customIconButtons) &&
                <TableCell
                    className={classes.actionItemCell}
                    key={`table-head-cell-actions`}>
                </TableCell>
            }
        </TableRow>
    )
}