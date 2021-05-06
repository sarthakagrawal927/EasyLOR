import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { theme } from "../utils/chakraTheme";
import { useApollo } from "../utils/apollo";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
	const client = useApollo();
	return (
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</ApolloProvider>
	);
}
