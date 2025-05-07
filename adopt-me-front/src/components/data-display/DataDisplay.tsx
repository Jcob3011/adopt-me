import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Divider from "@mui/material/Divider";
import classes from "./DataDisplay.module.css"
import {KeyValueText, KeyValueTextProps} from "./key-value-text/KeyValueText";

type Props = {
    id: string
    data: KeyValueTextProps[]
    metaData: KeyValueTextProps[]
}

export const DataDisplay = ({id, data, metaData}: Props) => {
    const {t} = useTranslation()
    data = data.filter(item => item.value !== null)
    metaData = metaData.filter(item => item.value !== null)
    const dataCol1: KeyValueTextProps[] = data.splice(0, Math.ceil(data.length / 2))
    const dataCol2: KeyValueTextProps[] = data
    const metaDataCol1: KeyValueTextProps[] = metaData.splice(0, Math.ceil(metaData.length / 2))
    const metaDataCol2: KeyValueTextProps[] = metaData

    return (
        <Box className={classes.outerBox}>
            {(dataCol1.length > 0 || dataCol2.length > 0) &&
                <>
                    <Box className={classes.dataHeaderBox}>
                        <Typography className={classes.headerText}>
                            {t('components.dataDisplay.data')}
                        </Typography>
                    </Box>
                    <Divider className={classes.divider}/>
                    <Box className={classes.contentBox}>
                        <Box className={classes.columnFirst}>
                            {dataCol1.map((keyValueTextProps, index) =>
                                <KeyValueText
                                    key={`data-display-text-col1-${id}-${index}`}
                                    keyText={keyValueTextProps.keyText}
                                    value={keyValueTextProps.value}
                                    valueType={keyValueTextProps.valueType ? keyValueTextProps.valueType : undefined}
                                />
                            )}
                        </Box>
                        <Box className={classes.columnSecond}>
                            {dataCol2.map((keyValueTextProps, index) =>
                                <KeyValueText
                                    key={`data-display-text-col2-${id}-${index}`}
                                    keyText={keyValueTextProps.keyText}
                                    value={keyValueTextProps.value}
                                    valueType={keyValueTextProps.valueType ? keyValueTextProps.valueType : undefined}
                                />
                            )}
                        </Box>
                    </Box>
                </>
            }
            {(metaDataCol1.length > 0 || metaDataCol2.length > 0) &&
                <>
                    <Box className={classes.metaDataHeaderBox}>
                        <Typography className={classes.headerText}>
                            {t('components.dataDisplay.metaData')}
                        </Typography>
                    </Box>
                    <Divider className={classes.divider}/>
                    <Box className={classes.contentBox}>
                        <Box className={classes.columnFirst}>
                            {metaDataCol1.map((keyValueTextProps, index) =>
                                <KeyValueText
                                    key={`meta-data-display-text-col1-${id}-${index}`}
                                    keyText={keyValueTextProps.keyText}
                                    value={keyValueTextProps.value}
                                    valueType={keyValueTextProps.valueType ? keyValueTextProps.valueType : undefined}
                                />
                            )}
                        </Box>
                        <Box className={classes.columnSecond}>
                            {metaDataCol2.length > 1 && metaDataCol2.map((keyValueTextProps, index) =>
                                <KeyValueText
                                    key={`meta-data-display-text-col2-${id}-${index}`}
                                    keyText={keyValueTextProps.keyText}
                                    value={keyValueTextProps.value}
                                    valueType={keyValueTextProps.valueType ? keyValueTextProps.valueType : undefined}
                                />
                            )}
                        </Box>
                    </Box>
                </>
            }
        </Box>
    )
}