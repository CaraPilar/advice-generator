import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider, ScaleFade } from "@chakra-ui/react";
import Layout from '../components/layout';

import "../styles/styles.scss";

export default function App({ Component, pageProps, router }) {
  const theme = extendTheme({
    fonts: {
      body: `'Manrope'`,
    },
    styles: {
      global: (props) => ({
        body: {
          bg: "#1f2632",
        },
      }),
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ScaleFade key={router.route} initialScale={0.9} in="true">
          <Component {...pageProps} />
        </ScaleFade>
      </Layout>
    </ChakraProvider>
  );
}