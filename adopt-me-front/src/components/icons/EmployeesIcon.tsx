import {useTheme} from "@mui/material/styles";

export const EmployeesIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users-group" width="20"
                height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                strokeLinecap="round" strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
        <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
        <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
    </svg>
}