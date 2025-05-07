import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import classes from "./NotFound.module.css";

export const NotFound = () => {
    return (
        <Box className={`${classes.centerBox} ${classes.fullSizeBox}`}>
            <Typography variant="h1">
                Page not found.
            </Typography>
        </Box>
    )
}