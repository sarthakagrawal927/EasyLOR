import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "../context/auth";
import { theme } from "../utils/chakraTheme";
import { useApollo } from "../apollo/apollo";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
	const client = useApollo();
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</AuthProvider>
		</ApolloProvider>
	);
}
