import { Theme  } from "@mui/material";
import { createTheme } from "@mui/material";

export const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64ffda",
    },
    secondary: {
      main: "#ea80fc",
    },
  },
});

export const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7b1fa2",
    },
    secondary: {
      main: "#00bcd4",
    },
  },
});
