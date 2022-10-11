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
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoIcon from "@mui/icons-material/Support";

import { useState } from "react";
import Link from "next/link";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const GroupBox = styled(Box)({
  display: "flex",
  gap: "10px",
});

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="sticky" color="primary">
      <StyledToolbar>
        <Link href="/">
          <a>
            <GroupBox>
              <LogoIcon fontSize="large" />
              <Typography
                variant="h4"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                liamazons
              </Typography>
            </GroupBox>
          </a>
        </Link>
      </StyledToolbar>
    </AppBar>
  );
};
