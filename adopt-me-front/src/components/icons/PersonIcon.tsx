import {useTheme} from "@mui/material/styles";

type Props = {}

export const PersonIcon = ({}: Props) => {
    const theme = useTheme()
    return (
        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false"
             style={{color: theme.palette.text.secondary}} aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonIcon">
            <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        </svg>
    )
}