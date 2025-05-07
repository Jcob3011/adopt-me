import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import {Chip, Menu, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import React, {useContext, useState} from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import classes from "./TopRightMenu.module.css";
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import {SettingsIcon} from "../../../icons/SettingsIcon";
import {AuthContext} from "../../../../providers/auth-provider/AuthProvider";
import {Image} from "../../../image/Image";

interface TopRightMenuProps {
    topRightMenuItems: {
        settings: {
            label: string,
            icon: JSX.Element,
            path: string,
        }[]
    }
}

const TopRightMenu: React.FC<TopRightMenuProps> = ({topRightMenuItems}) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [mouseOver, setMouseOver] = useState(false)
    const {loggedUser} = useContext(AuthContext)
    const [chipHover, setChipHover] = useState(false)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleChipHover = () => {
        setChipHover(!chipHover)
    }

    return (
        <Box>
            <Tooltip title={''}>
                <Chip onClick={handleOpenUserMenu}
                      onMouseEnter={() => {
                          toggleChipHover()
                          setMouseOver(true)
                      }}
                      onMouseLeave={() => {
                          toggleChipHover()
                          setMouseOver(false)
                      }}
                      sx={mouseOver || anchorElUser ? {
                          backgroundColor: theme.palette.chipMenu.backgroundHover + ' !important'
                      } : {
                          backgroundColor: theme.palette.chipMenu.background + ' !important'
                      }}
                      className={classes.Chip}
                      label={<Box className={classes.ChipLabelSettingsIcon}>
                          <SettingsIcon active={chipHover || !!anchorElUser}/>
                      </Box>}
                      avatar={
                          <Avatar
                              className={classes.ChipAvatar}
                              sx={{bgcolor: theme.palette.chipAvatar.background}}>
                              {loggedUser!.attachment ?
                                  <Image
                                      rounded
                                      minWidth={35}
                                      minHeight={35}
                                      objectFit="cover"
                                      id={loggedUser!.attachment.id}
                                  /> :
                                  loggedUser!.firstName.substring(0, 1).toUpperCase()}
                          </Avatar>
                      }/>
            </Tooltip>
            <Menu
                className={classes.Menu}
                id="menu-appbar"
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: theme.palette.background.default
                    }
                }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Box>
                    {topRightMenuItems.settings.map((setting, index) => (
                        <MenuItem disableRipple className={classes.MenuItem}
                                  key={setting.label} onClick={handleCloseUserMenu}>
                            <ListItemButton className={classes.ListItemButton} onClick={() => {
                                navigate(setting.path)
                            }}>
                                <ListItemIcon>{setting.icon}</ListItemIcon>
                                <Typography color={theme.palette.text.secondary} className={classes.MenuItemLabel}
                                            textAlign="center">{setting.label}</Typography>
                            </ListItemButton>
                        </MenuItem>
                    ))}
                </Box>
            </Menu>
        </Box>
    )
}
export default TopRightMenu