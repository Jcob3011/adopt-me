import {useTheme} from "@mui/material/styles";

export const PredefinedIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checklist" width="20"
                height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                strokeLinecap="round" strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8"></path>
        <path d="M14 19l2 2l4 -4"></path>
        <path d="M9 8h4"></path>
        <path d="M9 12h2"></path>
    </svg>
}