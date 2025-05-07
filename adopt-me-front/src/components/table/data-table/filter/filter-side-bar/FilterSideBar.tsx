import {Button, Drawer, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {TableFilterType} from "../../table/DataTable";
import {TableFilter} from "../TableFilter";
import {useEffect, useState} from "react";
import {SearchCriteria} from "../../../../../api/commons/search/SearchCriteria";
import classes from "./FilterSideBar.module.css"
import {useTranslation} from "react-i18next";
import {SelectOption} from "../variants/selectFilter/SelectFilterField";
import {useTheme} from "@mui/material/styles";

type Props = {
    isOpen: boolean
    toggleDrawer: (isOpen: boolean) => void
    filters: TableFilterType[]
    setSearchCriteria: (criteria: SearchCriteria[] | undefined) => void
}


export const FilterSideBar = ({isOpen, toggleDrawer, filters, setSearchCriteria}: Props) => {
    const [criteriaMap, setCriteriaMap] =
        useState(new Map<string, SearchCriteria | undefined>())
    const [filtersOptionsMap, setFiltersOptionsMap]
        = useState(new Map<string, SelectOption[] | undefined>())
    const {t} = useTranslation()
    const theme = useTheme()

    useEffect(() => {
        filters.forEach(filter => {
            if (filter.selectOptions) {
                setFiltersOptionsMap(prevState => {
                    const newFilterMap = new Map(prevState)
                    return newFilterMap.set(filter.field, filter.selectOptions)
                })
            }
            if (filter.selectOptionsPromise) {
                setFiltersOptionsMap(prevState => {
                    const newFilterMap = new Map(prevState)
                    filter.selectOptionsPromise!().then(value => newFilterMap.set(filter.field, value))
                    return newFilterMap
                })

            }
        })
    }, [filters])

    const handleClick = () => {
        let criteria: SearchCriteria[] = []
        criteriaMap.forEach(value => {
            if (value) {
                criteria.push(value)
            }
        })
        setSearchCriteria(criteria)
        toggleDrawer(false)
    }

    const handleReset = () => {
        setCriteriaMap(new Map())
        setSearchCriteria(undefined)
        toggleDrawer(false)
    }

    return (
        <Drawer
            className={classes.drawer}
            anchor={'right'}
            open={isOpen}
            onClose={() => toggleDrawer(false)}
        >
            <Box className={classes.outerBox}
                 sx={{
                     backgroundColor: theme.palette.background.default
                 }}
            >
                <Box>
                    <Typography variant='h5' className={classes.filtersBoxTypography}>
                        {t('components.table.filter.filterSideBar.filters')}
                    </Typography>
                    <Stack m={5} spacing={3} direction='column'>
                        {filters.map(filter => <TableFilter
                                key={`filter-${filter.label}`}
                                field={filter.field}
                                label={filter.label}
                                criteriaMap={criteriaMap}
                                setCriteriaMap={setCriteriaMap}
                                selectOptions={filter.selectOptions}
                                selectOptionsPromise={filter.selectOptionsPromise}
                                variant={filter.variant}
                                options={filtersOptionsMap.get(filter.field)}
                                enumTranslation={filter.enumTranslation}
                                queryOperator={filter.queryOperator}
                            />
                        )}
                    </Stack>
                </Box>
                <Box className={classes.stackBox}>
                    <Stack className={classes.buttonsStack}
                           direction='row'
                           spacing={3}
                    >
                        <Button
                            variant='contained'
                            onClick={() => handleClick()}
                            className={classes.button}
                            sx={{
                                backgroundColor: theme.palette.button.main
                            }}>
                            {t('components.table.filter.filterSideBar.apply')}
                        </Button>
                        <Button
                            color='error'
                            variant='outlined'
                            onClick={() => handleReset()}
                            className={classes.button}>
                            {t('components.table.filter.filterSideBar.reset')}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Drawer>
    )
}