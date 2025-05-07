import {useTheme} from "@mui/material/styles";

export const ActivityIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-analytics"
                width="20px" height="20px" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                strokeLinecap="round" strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <rect x="3" y="4" width="18" height="12" rx="1"></rect>
        <line x1="7" y1="20" x2="17" y2="20"></line>
        <line x1="9" y1="16" x2="9" y2="20"></line>
        <line x1="15" y1="16" x2="15" y2="20"></line>
        <path d="M8 12l3 -3l2 2l3 -3"></path>
    </svg>
}