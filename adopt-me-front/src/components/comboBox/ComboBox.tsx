import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {Popper} from "@mui/material";

interface CustomComboBoxProps {
    comboBoxName: string
    label: string[]
}
export const ComboBox = (Props: CustomComboBoxProps) => {
    const CustomPopper = React.forwardRef<HTMLDivElement>((props, ref) => (
        <Popper open={true} {...props} ref={ref} placement="bottom-start" />
    ));

    return (
        <Autocomplete
            disablePortal
            id="combo-box"
            options={Props.label}
            PopperComponent={CustomPopper}
            sx={{
                '& .MuiAutocomplete-paper': {
                    marginTop: 'unset',
                    marginBottom: 'unset',
                    maxHeight: 'unset',
                },
            }}
            renderInput={(params) => <TextField {...params} label={Props.comboBoxName} />}
        />
    );
};
