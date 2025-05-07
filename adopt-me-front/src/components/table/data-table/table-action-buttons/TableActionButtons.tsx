import {Box} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';
import {FilterSideBar} from "../filter/filter-side-bar/FilterSideBar";
import {useState} from "react";
import {TableFilterType} from "../table/DataTable";
import {SearchCriteria} from "../../../../api/commons/search/SearchCriteria";
import classes from "./TableActionButtons.module.css"
import {useTheme} from "@mui/material/styles";

type Props = {
    filters: TableFilterType[]
    setSearchCriteria: (criteria: SearchCriteria[] | undefined) => void
}

export const TableActionButtons = ({filters, setSearchCriteria}: Props) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const toggleDrawer = (isOpen: boolean) => {
        setOpen(isOpen)
    }

    return (
        <>
            <Box className={classes.box}>
                <IconButton
                    onClick={() => toggleDrawer(true)}
                    sx={{
                        '& svg': {
                            fill: theme.palette.table.filterIcon
                        }
                    }}
                    className={classes.iconButton}>
                    <FilterListIcon/>
                </IconButton>
            </Box>
            <FilterSideBar setSearchCriteria={setSearchCriteria} filters={filters} isOpen={open}
                           toggleDrawer={toggleDrawer}/>
        </>
    )
}