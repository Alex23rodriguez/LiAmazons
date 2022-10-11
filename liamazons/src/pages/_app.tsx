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
import { Header } from "../components/Header";
import {darkTheme, lightTheme} from '../utils/themes'

const MyApp: AppType = (props) => {
  const [myTheme, setMyTheme] = useState<"dark" | "light">("dark");
  const theme = myTheme === 'dark' ? darkTheme : lightTheme

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
