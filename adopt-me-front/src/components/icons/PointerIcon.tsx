import {useTheme} from "@mui/material/styles";

type Props = {}

export const PointerIcon = ({}: Props) => {
    const theme = useTheme()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-point-filled" width="12" height="12"
         viewBox="0 0 24 24" style={{color: theme.palette.pointer}} strokeWidth="1.5" strokeLinecap="round"
         strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" strokeWidth="0"
              fill="currentColor"/>
    </svg>
    )
}