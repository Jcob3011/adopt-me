import {useTheme} from "@mui/material/styles";

interface ChangePasswordIconProps {
    active?: boolean
}

export const ChangePasswordIcon = ({active = false}: ChangePasswordIconProps) => {
    const theme = useTheme()
    return <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiTab-iconWrapper css-169n2xt" focusable="false"
                aria-hidden="true" viewBox="0 0 24 24" data-testid="LockTwoToneIcon" width="20px" height="20px"
                fill={active ? "rgb(33, 150, 243)": theme.palette.text.secondary}>
        <path d="M6 20h12V10H6v10zm6-7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" opacity=".3"/>
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
    </svg>
}