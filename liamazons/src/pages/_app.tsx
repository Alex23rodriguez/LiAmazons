// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";
import "../styles/lobby.css";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import createEmotionCache from "../utils/createEmotionCache";
import { useState } from "react";
import { Header } from "../components/Header";
import { darkTheme, lightTheme } from "../utils/themes";

const MyApp: AppType = (props) => {
  const [myTheme, setMyTheme] = useState<"dark" | "light">("dark");
  const theme = myTheme === "dark" ? darkTheme : lightTheme;

  const clientSideEmotionCache = createEmotionCache();

  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props as any;

  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            toggleTheme={() => {
              setMyTheme(myTheme === "dark" ? "light" : "dark");
            }}
          />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
