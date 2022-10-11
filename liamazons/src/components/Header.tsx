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
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoIcon from "@mui/icons-material/Support";

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

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <AppBar position="sticky" color="primary">
      <StyledToolbar>
        <Link href="/">
          <a>
            <GroupBox>
              <LogoIcon
                fontSize="large"
                color={isDark ? "primary" : undefined}
              />
              <Typography
                variant="h4"
                sx={{ display: { xs: "none", sm: "block" } }}
                color={isDark ? "primary" : "black"}
              >
                liamazons
              </Typography>
            </GroupBox>
          </a>
        </Link>
        <GroupBox>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </GroupBox>
      </StyledToolbar>
    </AppBar>
  );
};
