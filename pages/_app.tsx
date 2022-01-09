import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { useReducer } from "react";

import theme from "../theme";
// eslint-disable-next-line import/order
import { ArticlesContext } from "../src/context/provider";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/100.css";

import { articlesReducer, initialArticlesState } from "../src/context/reducers/articlesReducer";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(articlesReducer, initialArticlesState);

  return (
    <ChakraProvider theme={theme}>
      <ArticlesContext.Provider value={{ state, dispatch }}>
        <Head>
          <title>IQL | Andá a saber de dónde salió</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box as="main" overflow="hidden">
          <Component {...pageProps} />
        </Box>
      </ArticlesContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
