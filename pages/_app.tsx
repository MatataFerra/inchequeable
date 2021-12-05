import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/100.css";

import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>IQL | Andá a saber de dónde salió</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box height="100vh" as="main" overflow="hidden">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
