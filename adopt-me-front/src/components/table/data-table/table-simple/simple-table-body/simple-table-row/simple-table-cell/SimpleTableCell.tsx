import TableCell from "@mui/material/TableCell";
import {SimpleColumnType} from "../../../SimpleTable";
import {get} from "lodash";
import {useFormatData} from "../../../../../../../utils/format/useFormatData";
import {useTheme} from "@mui/material/styles";

type Props<T> = {
    item: T
    column: SimpleColumnType<T>
}
export const SimpleTableCell = <T, >({item, column}: Props<T>) => {
    const value = get(item, column.key)
    const formattedValue = useFormatData(value, column.type, column.enumTranslation)

    return (
        <TableCell>
            {column.render ? column.render(column, item) : formattedValue}
        </TableCell>
    )
}