import {useTheme} from "@mui/material/styles";

export const LogsIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-arcs" width="20px"
                height="20px" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                strokeLinecap="round" strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="12" r="1"></circle>
        <path d="M16.924 11.132a5 5 0 1 0 -4.056 5.792"></path>
        <path d="M3 12a9 9 0 1 0 9 -9"></path>
    </svg>
}