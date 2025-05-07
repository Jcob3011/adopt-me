import {useTheme} from "@mui/material/styles";

export const WarningIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-circle" width="20"
                height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                strokeLinecap="round" strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
        <path d="M12 8v4"></path>
        <path d="M12 16h.01"></path>
    </svg>
}