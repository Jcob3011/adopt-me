import TableBody from "@mui/material/TableBody";
import {SimpleTableRow} from "./simple-table-row/SimpleTableRow";
import {SimpleColumnType} from "../SimpleTable";

type Props<T> = {
    data: T[]
    columns: SimpleColumnType<T>[]
    parentIndex: number
}
export const SimpleTableBody = <T, >({data, columns, parentIndex}: Props<T>) => {

    return (
        <TableBody>
            {Array.isArray(data) && data.map((item, index) =>
                <SimpleTableRow
                    key={`simple-table-body-row-${parentIndex}-${index}`}
                    columns={columns}
                    grandparentRowIndex={parentIndex}
                    itemIndex={index}
                    item={item}
                />
            )}
            {!Array.isArray(data) &&
                <SimpleTableRow
                    key={`simple-table-body-row-${parentIndex}`}
                    columns={columns}
                    grandparentRowIndex={parentIndex}
                    itemIndex={0}
                    item={data}
                />
            }
        </TableBody>
    )
}