import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  useTheme,
  Tooltip,
  ListItemIcon,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoIcon from "@mui/icons-material/Support";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { FC, useState } from "react";
import Link from "next/link";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const GroupBox = styled(Box)({
  display: "flex",
  gap: "10px",
});

export const Header: FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <AppBar position="sticky" enableColorOnDark>
      <StyledToolbar>
        <Link href="/">
          <a>
            <GroupBox>
              <LogoIcon
                fontSize="large"
                // color={isDark ? "primary" : undefined}
              />
              <Typography
                variant="h4"
                sx={{ display: { xs: "none", sm: "block" } }}
                // color={isDark ? "primary" : "white"}
              >
                liamazons
              </Typography>
            </GroupBox>
          </a>
        </Link>
        <GroupBox>
          <Tooltip
            title={isDark ? "switch to light mode" : "switch to dark mode"}
          >
            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Accout settings">
            <IconButton
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                src="http://placeimg.com/300/300/people"
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </GroupBox>
      </StyledToolbar>
    </AppBar>
  );
};
