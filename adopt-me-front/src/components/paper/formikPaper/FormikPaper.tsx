import classes from "./FormikPaper.module.css"
import {Formik, FormikValues} from "formik";
import Paper from "@mui/material/Paper";
import * as Yup from "yup";
import {AnyObject, Maybe} from "yup";
import Box from "@mui/material/Box";
import {ReactNode} from "react";
import {useTheme} from "@mui/material/styles";

type Props<T extends Maybe<AnyObject>> = {
    initialValues: T
    validationSchema: Yup.ObjectSchema<T>
    onSubmit: () => void
    formikHandleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
    children: ReactNode
}

export const FormikPaper = <T extends FormikValues>({
                                                        initialValues,
                                                        validationSchema,
                                                        onSubmit,
                                                        children,
                                                        formikHandleSubmit
                                                    }: Props<T>) => {
    const theme = useTheme()

    return (
        <Paper className={classes.paper} elevation={0} sx={{
            backgroundColor: theme.palette.background.default
        }}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => onSubmit()}
            >
                <Box
                    component="form"
                    className={classes.MainBox}
                    autoComplete="off"
                    onSubmit={formikHandleSubmit}
                >
                    {children}
                </Box>
            </Formik>
        </Paper>
    )
}