import {useTheme} from "@mui/material/styles";

export const QuizIcon = () => {
    const theme = useTheme()
    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clipboard-text" width="20"
                height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                strokeLinecap="round" strokeLinejoin="round" style={{color: theme.palette.text.secondary}}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
        <path d="M9 12h6"></path>
        <path d="M9 16h6"></path>
    </svg>
}