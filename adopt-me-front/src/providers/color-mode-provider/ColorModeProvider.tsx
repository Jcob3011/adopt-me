import * as React from "react";
import {ReactNode, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";
import {darkTheme, lightTheme} from "../../theme/Theme";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

type Props = {
    children: ReactNode
}

export const ColorModeProvider = ({children}: Props) => {
    const modeOrNull = localStorage.getItem('colorMode')
    const modeFromStorage: 'light' | 'dark' = (modeOrNull && modeOrNull === 'dark') ? 'dark' : 'light'
    const [mode, setMode] = useState<'light' | 'dark'>(modeFromStorage)

    const newTheme = React.useMemo(
        () => {
            return createTheme(mode === 'light' ? lightTheme : darkTheme);
        },
        [mode],
    );

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={newTheme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}