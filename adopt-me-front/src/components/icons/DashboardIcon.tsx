import {useTheme} from "@mui/material/styles";

export const DashboardIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dashboard" width="20px"
                height="20px" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                strokeLinecap="round" strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="13" r="2"></circle>
        <line x1="13.45" y1="11.55" x2="15.5" y2="9.5"></line>
        <path d="M6.4 20a9 9 0 1 1 11.2 0z"></path>
    </svg>
}