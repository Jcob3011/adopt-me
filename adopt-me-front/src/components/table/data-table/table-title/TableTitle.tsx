import {Box, Typography} from "@mui/material";
import * as React from "react";
import classes from "./TableTitle.module.css"
import {useTheme} from "@mui/material/styles";
import {TableActionButtons} from "../table-action-buttons/TableActionButtons";
import {TableFilterType} from "../table/DataTable";
import {SearchCriteria} from "../../../../api/commons/search/SearchCriteria";

type Props = {
    name: string
    filters: TableFilterType[] | undefined
    setSearchCriteria:  React.Dispatch<React.SetStateAction<SearchCriteria[] | undefined>>
}
export const TableTitle = ({name, filters, setSearchCriteria}: Props) => {
    const theme = useTheme()
    return (
        <Box className={classes.box}>
            <Typography className={classes.text}
                        style={{
                            color: theme.palette.text.primary
                        }}
            >
                {name}
            </Typography>
            {filters &&
                <TableActionButtons filters={filters} setSearchCriteria={setSearchCriteria}/>
            }
        </Box>
    )
}