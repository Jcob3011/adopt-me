import {Formik, useFormik} from "formik";
import * as Yup from "yup";
import {api} from "../../api";
import {Box, Button, TextField} from "@mui/material";
import classes from "./TagCreatePage.module.css";
import * as React from "react";
import {useState} from "react";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {useTranslation} from "react-i18next";
import {RoutePath} from "../../router/RoutePath";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";

export const TagCreatePage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate();
    const theme = useTheme()
    const initialValues = {
        name: ""
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(() => t('pages.tagCreate.required'))
            .min(1, () => t('pages.tagCreate.min'))
            .max(30, () => t('pages.tagCreate.max')),
    });
    const [open, setOpen] = useState(false);
    const handleDialogClose = () => {
        setOpen(false);
        navigate(RoutePath.TAG_LIST_PAGE);
    };
    const handleSubmit = async () => {
        try {
            await api.tag.saveTag({name: formik.values.name})
            setOpen(true)
        } catch (error) {
            console.error(t('pages.tagCreate.error'), error)
        }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    })

    return (
        <Paper>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Box
                    component="form"
                    className={classes.MainBox}
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                    sx={{
                        backgroundColor: theme.palette.background.default
                    }}
                >
                    <Box>
                        <TextField
                            id="name"
                            name="name"
                            color='primary'
                            label={t('pages.tagCreate.label')}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && !!formik.errors.name}
                            helperText={formik.touched.name && formik.errors.name ? formik.errors.name.toString() : ''}
                            className={classes.FormikTextField}
                        />
                    </Box>
                    <Button type="submit"
                            sx={{
                                color: theme.palette.button.main
                            }}
                            className={classes.FormikButton}>
                        {t('pages.tagCreate.save')}
                    </Button>
                </Box>
            </Formik>
            {open && (renderConfirmationDialog())}
        </Paper>
    )

    function renderConfirmationDialog() {
        return (
            <Dialog open={open} onClose={handleDialogClose}>
                <Paper sx={{
                    backgroundColor: theme.palette.background.default
                }}>
                    <DialogTitle>
                        {t('pages.tagCreate.addTag')}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('pages.tagCreate.addedTag')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleDialogClose}>
                            {t('pages.tagCreate.ok')}
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        )
    }
}

