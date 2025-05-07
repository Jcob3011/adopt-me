import {useTheme} from "@mui/material/styles";


type Props = {
    isMouseOver: boolean
}

export const MenuIcon = ({isMouseOver}: Props) => {
    const theme = useTheme()
    return (
        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false"
             style={isMouseOver ? {color: theme.palette.menuIcon.iconHover} : {color: theme.palette.menuIcon.icon}}
             aria-hidden="true" viewBox="0 0 24 24" data-testid="MenuIcon">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
        </svg>
    )
}