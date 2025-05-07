import {Box} from "@mui/material";
import classes from "./RoundedBox.module.css";
import * as React from "react";
import {useTheme} from "@mui/material/styles";

interface RoundedBoxProps {
    label: string,
    resize?: boolean
    handleClick?: () => void
}

export const RoundedBox = ({label, resize, handleClick}: RoundedBoxProps) => {
    const theme = useTheme()
    return <Box
        onClick={handleClick}
        className={classes.RoundedFieldBox}
        sx={{
            ...(resize ? {maxWidth: 'fit-content !important'} : {}),
            color: theme.palette.text.primary
        }}
    >
        {label}
    </Box>
}