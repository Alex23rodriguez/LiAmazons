// import { Lobby } from "boardgame.io/react";
import type { NextPage } from "next";
// import { AmazonsGame as Amazons } from "../games/amazons/game";
// import { Page as AmazonsBoard } from "../games/amazons/page";
import {
  Typography,
  Stack,
  Box,
  Tabs,
  Tab,
  AppBar,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { CreateGame } from "../components/CreateGame";
import { useSession } from "next-auth/react";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const LobbyPage: NextPage = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const { data: session } = useSession();
  const pName =
    session?.user?.email ?? "vst_" + Math.random().toString(36).substring(2);

  return (
    <Stack alignItems="center" mt={4} spacing={3}>
      <Typography variant="h2" color="primary">
        play online
      </Typography>

      <Box sx={{ bgcolor: "background.paper", width: { xs: "100%", md: 800 } }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Create game" {...a11yProps(0)} />
            <Tab label="Join game" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CreateGame playerName={pName} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          There are currently no active games. Please create one yourself.
        </TabPanel>
      </Box>
    </Stack>
  );
};

export default LobbyPage;
