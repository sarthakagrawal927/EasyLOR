import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../utils/chakraTheme";
import "../styles/index.css";
function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
