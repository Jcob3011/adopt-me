import {Box, LinearProgress} from "@mui/material";
import classes from "./LinearProgressBar.module.css"

type Props = {
    display: boolean
}

export const LinearProgressBar = ({display}: Props) => {

    return (
        <>
            {display &&
                <Box className={classes.box}>
                    <LinearProgress/>
                </Box>
            }
        </>
    )
}