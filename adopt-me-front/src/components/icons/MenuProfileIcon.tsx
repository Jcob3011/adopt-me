import {useTheme} from "@mui/material/styles";

export const MenuProfileIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="20px"
                height="20px" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                strokeLinecap="round" strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <circle cx="12" cy="7" r="4"></circle>
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
}