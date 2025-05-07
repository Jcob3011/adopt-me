import classes from "./CustomSelect.module.css"
import {Box, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import {useContext} from "react";
import {EnumTranslateContext, TranslationKeyValue} from "../../providers/enum-translate-provider/EnumTranslateProvider";
import {useTheme} from "@mui/material/styles";

type Props = {
    id: string
    name: string
    inputText: string
    options: string[]
    values: string[]
    onChange: (event: SelectChangeEvent<string[]>) => void
    valueTranslation: TranslationKeyValue
}

export const CustomSelect = ({name, id, onChange, options, values, inputText, valueTranslation}: Props) => {
    const {translateEnum} = useContext(EnumTranslateContext)
    const theme = useTheme()

    return (
        <FormControl
            variant='outlined'
            className={classes.formControl}>
            <InputLabel color='info'>
                {inputText}
            </InputLabel>
            <Select
                color='info'
                multiple
                id={id}
                name={name}
                renderValue={(selected) => (
                    <Box className={classes.displayValues}>
                        {selected.map((value) => (
                            <Chip key={value} color='info' label={translateEnum(valueTranslation, value)}/>
                        ))}
                    </Box>
                )}
                label={inputText}
                value={values}
                sx={{
                    "& input": {
                        backgroundColor: theme.palette.background.default,
                    }
                }}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            backgroundColor: theme.palette.background.default
                        }
                    }
                }}

                onChange={(event) => onChange(event)}>
                {options.map(option => (
                    <MenuItem key={`select-${option}`} value={option} className={classes.menuItem}>
                        <Checkbox color='info' checked={values.includes(option)}/>
                        <ListItemText primary={translateEnum(valueTranslation, option)}/>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}