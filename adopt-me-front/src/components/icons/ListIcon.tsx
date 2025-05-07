import {useTheme} from "@mui/material/styles";

export const ListIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list" width="20" height="20"
                viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
                strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 6l11 0"></path>
        <path d="M9 12l11 0"></path>
        <path d="M9 18l11 0"></path>
        <path d="M5 6l0 .01"></path>
        <path d="M5 12l0 .01"></path>
        <path d="M5 18l0 .01"></path>
    </svg>
}