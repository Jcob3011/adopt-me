import {Box, Typography} from "@mui/material";
import {ValueType} from "../../../types/ValueType";
import classes from "./KeyValueText.module.css"
import {useFormatData} from "../../../utils/format/useFormatData";


export type KeyValueTextProps = {
    keyText: string
    value: any
    valueType?: ValueType
}

export const KeyValueText = ({keyText, value, valueType}: KeyValueTextProps) => {

    return (
        <Box className={classes.box}>
            <Typography className={classes.keyText}>
                {`${keyText}:`} &nbsp;
            </Typography>
            <Typography className={classes.value}>
                {useFormatData(value, valueType)}
            </Typography>
        </Box>
    )
}