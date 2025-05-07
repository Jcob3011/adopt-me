import {useTranslation} from "react-i18next";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import * as React from "react";
import classes from "./ItemNotExist.module.css"

type Props = {
    itemName: string
}

export const ItemNotExist = ({itemName}: Props) => {
    const {t} = useTranslation()
    const navigate = useNavigate()

    return (
        <>
            <Box className={classes.box}>
                <Typography className={classes.typography}>
                    {`${itemName} ${t('components.itemNotExist')}`}
                </Typography>
                <Button className={classes.button} onClick={() => navigate(-1)}>
                    {t('commons.back')}
                </Button>
            </Box>
        </>
    )
}