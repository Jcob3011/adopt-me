import {Grid} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {ActivityStatisticDto} from "../../api/activity/response/ActivityStatisticDto";
import classes from "./Dashboard.module.css";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import AttachmentIcon from '@mui/icons-material/Attachment';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SendIcon from '@mui/icons-material/Send';
import {ActivityType} from "../../types/ActivityType";
import {StatisticTypeTranslate} from "../../providers/enum-translate-provider/Translations";
import {EnumTranslateContext} from "../../providers/enum-translate-provider/EnumTranslateProvider";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {AuthContext} from "../../providers/auth-provider/AuthProvider";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../router/RoutePath";

export const DashboardPage = () => {

    const theme = useTheme()
    const {loggedUser} = useContext(AuthContext);
    const {translateEnum} = useContext(EnumTranslateContext)
    const [response] = useState<ActivityStatisticDto[]>()
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedUser) {
            navigate(RoutePath.LOGIN)
        }
    }, [loggedUser])

    const getIconByType = (type: ActivityType) => {
        switch (type) {
            case ActivityType.LOGIN_SUCCESS:
                return <LockOpenIcon color="primary"/>;
            case ActivityType.LOGIN_FAILED:
                return <LockIcon color="primary"/>;
            case ActivityType.ADDED_ATTACHMENT:
                return <AttachmentIcon color="primary"/>;
            case ActivityType.REMOVED_ATTACHMENT:
                return <LinkOffIcon color="primary"/>;
            case ActivityType.ADDED_ANIMAL:
                return <MarkChatReadIcon color="primary"/>;
            case ActivityType.UPDATE_ANIMAL:
                return <QuestionAnswerTwoToneIcon color="primary"/>;
            case ActivityType.REMOVED_ANIMAL:
                return <QuestionAnswerOutlinedIcon color="primary"/>;
            case ActivityType.ADDED_TAG:
                return <AddCircleOutlineOutlinedIcon color="primary"/>;
            case ActivityType.REMOVED_TAG:
                return <RemoveCircleOutlineOutlinedIcon color="primary"/>;
            case ActivityType.ADDED_USER:
                return <PersonAddAltOutlinedIcon color="primary"/>;
            case ActivityType.REMOVED_USER:
                return <PersonRemoveIcon color="primary"/>;
            case ActivityType.SENT_NOTIFICATION:
                return <SendIcon color="primary"/>;
        }
    }

    return (
        <Grid spacing={2} className={classes.GridContainer}>
            {response && response.map((item, number) =>
                <Grid item key={number} className={classes.GridItem}>
                    <Paper className={classes.StatisticItem} sx={{
                        backgroundColor: theme.palette.paper.fourth
                    }}>
                        <Box>
                            <Box className={classes.StatisticValue}>{item.count}</Box>
                            <Box
                                className={classes.StatisticLabel}>{translateEnum(StatisticTypeTranslate, item.type)}</Box>
                        </Box>
                        <div className={classes.StatisticIcon}>
                            {getIconByType(item.type)}
                        </div>
                    </Paper>
                </Grid>
            )}
        </Grid>
    )
}
