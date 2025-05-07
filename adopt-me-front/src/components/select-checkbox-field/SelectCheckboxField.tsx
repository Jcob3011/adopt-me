import Autocomplete from "@mui/material/Autocomplete"
import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import {CheckBox, CheckBoxOutlineBlank} from "@mui/icons-material";
import React, {ChangeEvent, HTMLAttributes, SyntheticEvent, useEffect, useState} from "react";
import {QueryOperator} from "../../api/commons/search/QueryOperator";
import classes from "./SelectCheckboxField.module.css";
import {SearchForm} from "../../api/commons/search/SearchForm";
import {SearchResponse} from "../../api/commons/search/SearchResponse";
import {ColorType} from "../../types/ColorType";
import Typography from "@mui/material/Typography";
import {SelectCheckboxError} from "./error/SelectCheckboxError";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";

interface SelectCheckboxFieldProps<T> {
    selectPageSize: number
    searchOptionFieldName: string
    search: (form: SearchForm) => Promise<SearchResponse<T>>
    items: string[]
    setItems: (items: string[]) => void
    labelTranslation: string
    errorMessage?: string
    handleBlur: (e: React.ChangeEvent<any>) => void;
    noOptionsLabel: string
}

export const SelectCheckboxField = <T, >(props: SelectCheckboxFieldProps<T>) => {
    const [search, setSearch] = useState(false)
    const [lastPage, setLastPage] = useState(false)
    const [selectedPage, setSelectedPage] = useState(0)
    const [items, setItems] = useState<string[]>([])
    const theme = useTheme()
    const [textFieldValue, setTextFieldValue] = useState<string>("")
    const icon = <CheckBoxOutlineBlank fontSize="small"/>
    const checkedIcon = <CheckBox fontSize="small"/>

    useEffect(() => {
        if (!search) {
            props.search({
                criteria: [{
                    field: "deletedOn",
                    operator: QueryOperator.IS_NULL,
                }],
                page: selectedPage,
                size: props.selectPageSize
            }).then((response) => {
                const responseItems = response.items.map(item => {
                    const fieldItem = item[(props.searchOptionFieldName as keyof T)] as object
                    return fieldItem.toString()
                })
                setItems([...props.items, ...responseItems])
                setLastPage(response.lastPage)
            })
        }
    }, [selectedPage, search])

    const handleAutocompleteChange = (event: SyntheticEvent, values: string[]) => {
        props.setItems(values)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!search) {
            setSelectedPage(0)
        }

        setSearch(Boolean(e.target.value))
        setTextFieldValue(e.target.value)

        if (!e.target.value) {
            props.setItems([])
        }

        if (search) {
            props.search({
                criteria: [
                    {
                        field: props.searchOptionFieldName,
                        operator: QueryOperator.LIKE,
                        value: e.target.value
                    },
                    {
                        field: "deletedOn",
                        operator: QueryOperator.IS_NULL,
                    }
                ],
                page: selectedPage,
                size: props.selectPageSize
            }).then(response => {
                const responseItems = response.items.map(item => {
                    const fieldItem = item[(props.searchOptionFieldName as keyof T)] as object
                    return fieldItem.toString()
                })
                setItems(responseItems)
            })
        }
    }

    const handleScroll = (e: SyntheticEvent) => {
        const listBoxNode = e.currentTarget
        if (listBoxNode.scrollTop + listBoxNode.clientHeight === listBoxNode.scrollHeight) {
            if (!lastPage) {
                setSelectedPage(selectedPage + 1)
            }
        }
    }

    const renderOption = (
        props: HTMLAttributes<HTMLLIElement>,
        option: string, {selected}: { selected: boolean }) => (
        <li {...props} key={option} className={classes.MenuItem}>
            <Checkbox
                icon={icon}
                color={ColorType.INFO}
                checkedIcon={checkedIcon}
                checked={selected}
            />
            {option}
        </li>
    )

    return <Box>
        <Autocomplete
            multiple
            options={items}
            disableCloseOnSelect
            value={props.items}
            inputValue={textFieldValue}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: theme.palette.background.default
                    }
                }
            }}
            className={classes.AutocompleteField}
            noOptionsText={
                <Typography className={classes.NoOptionsLabel}>
                    {props.noOptionsLabel}
                </Typography>}
            onChange={handleAutocompleteChange}
            getOptionLabel={(option) => option}
            renderOption={renderOption}
            ListboxProps={{
                onScroll: handleScroll,
                className: classes.AutocompleteListBox
            }}
            sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.authForm.textField.backgroundColor,
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputLabelProps={{
                        style: {
                            color: theme.palette.text.primary,
                        }
                    }}
                    sx={{
                        border: `1px solid ${theme.palette.authForm.select.border} !important`,
                        borderRadius: '4px !important'
                    }}
                    error={Boolean(props.errorMessage)}
                    className={classes.SelectCheckboxField}
                    label={
                        <Typography className={classes.TextFieldLabel}>
                            {props.labelTranslation}
                        </Typography>}
                    value={textFieldValue}
                    onChange={handleChange}
                />
            )}
        />
        {props.errorMessage &&
            <SelectCheckboxError message={props.errorMessage}/>}
    </Box>
}