import {RouteProps, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {api} from "../../api";
import {Box, Card, CardContent, CardHeader, Grid, LinearProgress, Typography} from "@mui/material";
import classes from "./ActivityLogsDetails.module.css";
import Paper from "@mui/material/Paper";
import {ActivityDto} from "../../api/activity/response/ActivityDto";
import {EnumTranslateContext} from "../../providers/enum-translate-provider/EnumTranslateProvider";
import {ActivityTypeTranslate} from "../../providers/enum-translate-provider/Translations";
import {asDate} from "../../utils/format/FormatData";
import {useTheme} from "@mui/material/styles";

export const ActivityLogsDetails: React.FC<RouteProps> = () => {
    const location = useLocation()
    const currentPath = location.pathname
    const pathComponents = currentPath.split('/').filter(item => item !== '')
    const id = pathComponents[pathComponents.length - 1];
    const [activityDto, setAactivityDto] = useState<any>(null);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(true)
    const [reload, setReload] = useState(false);
    const {t} = useTranslation()
    const theme = useTheme()
    const {translateEnum} = useContext(EnumTranslateContext)

    useEffect(() => {
        api.activity.getActivity(id).then((result: ActivityDto) => {
            if (result !== null) {
                setAactivityDto(result);
                setError(false);
                setProgress(false);
                setReload(false);
            } else {
                setError(true);
                setProgress(false);
            }
        }).catch(() => {
        })
            .finally(() => {
                setProgress(false)
            });
    }, [reload, id]);

    function renderError() {
        return (
            <Grid>
                <Grid className={classes.ErrorGrid}>
                    <CardContent>
                        <Typography gutterBottom variant='body1' color='text.secondary'>
                            {t('pages.activityLogsDetails.errorNotExist')}
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>

        );
    }


    function renderActivityLogsDetails() {
        const params = activityDto.params;
        if (activityDto) {
            return (
                <Grid className={classes.MainGrid}>
                    <Grid className={classes.Grid2}>
                        <CardContent>
                            <Typography gutterBottom variant='body1'>
                                <b>{t('pages.activityLogsDetails.activityId')}</b>
                                {activityDto.id}
                            </Typography>
                            <Typography gutterBottom variant='body1'>
                                <b>{t('pages.activityLogsDetails.description')}</b>
                                {activityDto.description}
                            </Typography>
                            <Typography gutterBottom variant='body1'>
                                <b>{t('pages.activityLogsDetails.createdOn')}</b>
                                {asDate(activityDto.createdOn)}
                            </Typography>
                            <Typography gutterBottom variant='body1'>
                                <b>{t('pages.activityLogsDetails.createdById')}</b>
                                {activityDto.createdById}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid className={classes.Grid3}>
                        <CardContent>

                            <Typography gutterBottom variant='body1'>
                                <b>{t('pages.activityLogsDetails.type')}</b>
                                {translateEnum(ActivityTypeTranslate, activityDto.type)}
                            </Typography>
                            <Typography gutterBottom variant='body1'>
                                <b>{t('pages.activityLogsDetails.param.title')}</b>
                                {params.map(function (param: any) {
                                    return (
                                        <div key={param.id}>
                                            <li><b>{t('pages.activityLogsDetails.param.name')}</b>{param.name}</li>
                                            <li><b>{t('pages.activityLogsDetails.param.value')}</b>{param.value}</li>
                                        </div>
                                    )
                                })}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        <>
            <Paper className={classes.Paper}>
                <Box sx={{
                    height: '10px',
                    backgroundColor: theme.palette.background.default
                }}>
                    {progress && <LinearProgress/>}
                </Box>
                <Card className={classes.Card} elevation={0} sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: 0
                }}>
                    <Box className={classes.PaperBox}>
                        <CardHeader title={t('pages.activityLogsDetails.activityDetails')}
                        />
                    </Box>
                    {error || !activityDto ? renderError() : renderActivityLogsDetails()}
                </Card>
            </Paper>
        </>
    )

}
