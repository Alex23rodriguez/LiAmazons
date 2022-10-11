// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";
import "../styles/lobby.css";

import Head from "next/head";

import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import createEmotionCache from "../utils/createEmotionCache";
import { useState } from "react";

const MyApp: AppType = (props) => {
  const [myTheme, setMyTheme] = useState<"dark" | "light">("dark");
  const theme = createTheme({
    palette: {
      primary: {
        light: "#9effff",
        main: "#64ffda",
        dark: "#14cba8",
      },
      secondary: {
        light: "#666ad1",
        main: "#303f9f",
        dark: "#001970",
      },
      mode: myTheme,
    },
  });

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
          <Head>
            <title>liamazons</title>
            <meta name="description" content="liamazons" />
            <link rel="icon" href="/favicon.svg" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,700&display=swap"
            />
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
