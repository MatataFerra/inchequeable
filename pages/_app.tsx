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
        <Head>
          <meta
            name="description"
            content="Blog de noticias irónicas, opiniones, humor, de todas formas es Inchequeable."
          />
          <meta name="keywords" content="blog, noticias, humor, opinión, matias ferraro" />
          <meta name="robots" content="index, all, follow" />
          <meta name="category" content="Blog" />
          <meta name="author" content="Matias Ferraro" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="%PUBLIC_URL%" />
          <meta property="og:title" content="IQL | Andá a saber de dónde salió" />
          <meta
            property="og:description"
            content="Blog de noticias irónicas, opiniones, humor, de todas formas es Inchequeable."
          />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="500" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/docq8rbdu/image/upload/v1642110446/portada-iql_dlvqpc.png"
          />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="%PUBLIC_URL%" />
          <meta property="twitter:title" content="IQL | Andá a saber de dónde salió" />
          <meta
            property="twitter:description"
            content="Blog de noticias irónicas, opiniones, humor, de todas formas es Inchequeable."
          />
          <meta
            property="twitter:image"
            content="https://res.cloudinary.com/docq8rbdu/image/upload/v1642110446/portada-iql_dlvqpc.png"
          />
          <link rel="canonical" href="%PUBLIC_URL%" />
        </Head>
        <Box as="main" overflow="hidden">
          <Component {...pageProps} />
        </Box>
      </ArticlesContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
