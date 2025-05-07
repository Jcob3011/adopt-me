import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {SnackbarProvider} from "./providers/snackbar-provider/SnackbarProvider";
import {AxiosInterceptor} from "./api/config/AxiosClient";
import {AuthProvider} from "./providers/auth-provider/AuthProvider";
import {EnumTranslateProvider} from "./providers/enum-translate-provider/EnumTranslateProvider";
import {ColorModeProvider} from "./providers/color-mode-provider/ColorModeProvider";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <ColorModeProvider>
        <BrowserRouter>
            <SnackbarProvider>
                <EnumTranslateProvider>
                    <AxiosInterceptor>
                        <AuthProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <App/>
                            </LocalizationProvider>
                        </AuthProvider>
                    </AxiosInterceptor>
                </EnumTranslateProvider>
            </SnackbarProvider>
        </BrowserRouter>
    </ColorModeProvider>
);

reportWebVitals();
