import classes from "./Image.module.css"
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {api} from "../../api";
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {CustomDialog} from "../dialog/custom-dialog/CustomDialog";

type Props = {
    id?: string
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
    rounded?: boolean
    objectFit?: "fill" | "contain" | "cover" | "scale-down"
    clickable?: boolean
}

export const Image = ({
                          id,
                          rounded,
                          maxWidth,
                          clickable = false,
                          minWidth,
                          minHeight,
                          maxHeight,
                          objectFit
                      }: Props) => {
    const [error, setError] = useState(false)
    const [imageData, setImageData] = useState<string | undefined>()
    const [open, setOpen] = useState(false)
    const {t} = useTranslation()

    useEffect(() => {
        if (id) {
            api.attachment.download(id)
                .then((response) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(response);
                    reader.onload = function () {
                        setImageData(reader.result as string);
                    };
                    reader.onerror = function (error) {
                        setError(true);
                    };
                })
                .catch(error => {
                    setError(true);
                })
        }
    }, [id]);

    const imageStyles = {
        minWidth: minWidth ? `${minWidth}px` : undefined,
        minHeight: minHeight ? `${minHeight}px` : undefined,
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
        maxHeight: maxHeight ? `${maxHeight}px` : undefined,
        borderRadius: rounded ? "50%" : undefined,
    };

    const handleClick = () => {
        if(clickable) {
            setOpen(true)
        }
    }

    return (
        <>
            <Box className={classes.outerBox}>
                {(!error && imageData) &&
                    <Box
                        sx={{
                            ...imageStyles, ':hover': {
                                cursor: clickable ? 'pointer' : 'default'
                            }
                        }}
                        component='img'
                        src={imageData}
                        onClick={() => handleClick()}
                        style={{objectFit: objectFit ? objectFit : "fill"}}
                    />
                }
                {error &&
                    <Box className={classes.notFoundBox}>
                        <ImageNotSupportedIcon/>
                        <Typography className={classes.notFoundText}>
                            {t(`components.image.notFound`)}
                        </Typography>
                    </Box>
                }
            </Box>
            <Box>
                <CustomDialog title={''} content={
                    <Box
                        component='img'
                        src={imageData}
                        style={{width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh'}}
                    />
                } open={open} handleClose={() => setOpen(false)}/>
            </Box>
        </>
    )
}