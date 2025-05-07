import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import classes from "./SimpleTableTitle.module.css"

type Props = {
    title: string
}
export const SimpleTableTitle = ({title}: Props) => {

    return (
        <Box className={classes.box}>
            <Typography className={classes.typography}>
                {title}
            </Typography>
        </Box>
    )
}