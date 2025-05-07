import * as React from "react";
import {useEffect, useState} from "react";
import {Link, RouteProps, useLocation} from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    LinearProgress,
    TextField,
    Typography
} from "@mui/material";
import {api} from "../../api";
import Paper from "@mui/material/Paper";
import {TagDeleteDialog} from "./TagDeleteDialog";
import {RoutePath} from "../../router/RoutePath";
import * as Yup from 'yup';
import {ErrorMessage, Formik, useFormik} from "formik";
import classes from "./TagDetailsPage.module.css";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/material/styles";
import {formatValue} from "../../utils/FormatData";
import {ValueType} from "../../types/ValueType";

export const TagDetailsPage: React.FC<RouteProps> = () => {
    const location = useLocation()
    const currentPath = location.pathname
    const pathComponents = currentPath.split('/').filter(item => item !== '')
    const id = pathComponents[pathComponents.length - 1];
    const [tagDto, setTagDto] = useState<any>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [error, setError] = useState(false);
    const [progress, setProgress] = useState(true)
    const [reload, setReload] = useState(false);
    const {t} = useTranslation()
    const theme = useTheme()

    useEffect(() => {
        api.tag.getTag(id).then((result) => {
            if (result !== null) {
                setTagDto(result);
                setError(false)
                setProgress(false);
                setReload(false)
            } else {
                setError(true)
                setProgress(false)
            }
        }).catch(() => {
        })
            .finally(() => {
                setProgress(false)
            });
    }, [reload, id]);
    const handleEditDialogClick = () => {
        setOpenEdit((prevState) => !prevState);
    }
    const handleDeleteDialogClick = () => {
        setOpenDeleteDialog(true)
    }
    const handleDelete = () => {
        try {
            api.tag.deleteTag(id).then(() => {
                setReload(true)
                setError(true)
            })
        } catch (error) {
            setError(true)
        }
    }

    const initialValues = {
        name: tagDto ? tagDto.name : ''
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(() => (t('pages.tagDetailsPage.required')))
            .min(1, () => (t('pages.tagDetailsPage.min')))
            .max(50, () => (t('pages.tagDetailsPage.max'))),
    });

    const handleSubmit = (values: any) => {
        try {
            api.tag.updateTag(values, tagDto.id).then(() => {
                setReload(true)
            })
        } catch (error) {
            console.error(t('pages.tagDetailsPage.errorNotExist'), error);
        }
        handleEditDialogClick()
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    function renderError() {
        return (
            <Grid>
                <Grid className={classes.ErrorGrid}>
                    <CardContent>
                        <Typography gutterBottom variant="body1" color="text.secondary">
                            {t('pages.tagDetailsPage.errorNotExist')}
                        </Typography>
                    </CardContent>
                </Grid>
                <CardActions>
                    <Link to={RoutePath.TAG_LIST_PAGE}>
                        <Button>{t('pages.tagDetailsPage.back')}</Button>
                    </Link>
                </CardActions>
            </Grid>
        );
    }

    function renderButtons() {
        if (tagDto && tagDto.deletedById === null) {
            return (
                <>
                    <Button onClick={handleEditDialogClick}>
                        {openEdit ? t('pages.tagDetailsPage.closeEdit') : t('pages.tagDetailsPage.edit')}
                    </Button>
                    <Button color="error" onClick={handleDeleteDialogClick}>
                        {t('pages.tagDetailsPage.delete')}
                    </Button>
                </>
            );
        }
        return null;
    }

    function renderTagDetails() {
        if (tagDto) {
            if (openEdit) {
                return (
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Box
                            component="form"
                            className={classes.MainBox}
                            autoComplete="off"
                            onSubmit={formik.handleSubmit}
                        >
                            <Box>
                                <TextField
                                    id="name"
                                    name="name"
                                    label={t('pages.tagDetailsPage.label')}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && !!formik.errors.name}
                                    helperText={formik.touched.name && formik.errors.name ? formik.errors.name.toString() : ''}
                                    className={classes.FormikTextField}
                                />
                            </Box>
                            <Button type="submit"
                                    className={classes.FormikButton}>{t('pages.tagDetailsPage.save')}</Button>
                        </Box>
                    </Formik>
                );
            } else {
                return (
                    <Grid className={classes.MainGrid}>
                        <Grid
                            className={classes.Grid2}
                        >
                            <CardContent>
                                <Typography gutterBottom variant="body1">
                                    <b>{t('pages.tagDetailsPage.name')}</b>
                                    {tagDto.name}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid className={classes.Grid3}>
                            <CardContent>
                                <Typography gutterBottom variant="body1">
                                    <b>{t('pages.tagDetailsPage.createdOn')}</b>
                                    {formatValue(tagDto.createdOn,ValueType.SIMPLE_DATE)}
                                </Typography>
                                <Typography gutterBottom variant="body1">
                                    <b>{t('pages.tagDetailsPage.createdById')}</b>
                                    {tagDto.createdById}
                                </Typography>
                                <Typography gutterBottom variant="body1">
                                    <b>{t('pages.tagDetailsPage.updatedOn')}</b>
                                    {formatValue(tagDto.updatedOn,ValueType.SIMPLE_DATE)}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                );
            }
        }
    }
    return (
        <>
            <>
                <Box sx={{
                    height: '10px'
                }}>
                    {progress && <LinearProgress/>}
                </Box>
                <Card className={classes.Card} elevation={0} sx={{
                    backgroundColor: theme.palette.background.default
                }}>
                    <Box className={classes.PaperBox}>
                        <CardHeader
                            title={t('pages.tagDetailsPage.tagDetails')}
                        />
                        <CardActions>
                            {error ? '' : renderButtons()}
                        </CardActions>
                    </Box>
                    {error || !tagDto ? renderError() : renderTagDetails()}
                </Card>
            </>
            <TagDeleteDialog open={openDeleteDialog} handleClose={setOpenDeleteDialog} handleDelete={handleDelete}/>
        </>
    )
};