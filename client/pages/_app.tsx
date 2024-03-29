import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "../context/auth";
import { FacultyProvider } from "../context/faculty";
import { StudentProvider } from "../context/student";
import { AdminProvider } from "context/admin";
import { theme } from "../utils/chakraTheme";
import { useApollo } from "../apollo/apollo";
import "../styles/index.css";

export default function MyApp({ Component, pageProps }) {
	const client = useApollo();
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<AdminProvider>
					<FacultyProvider>
						<StudentProvider>
							<ChakraProvider theme={theme}>
								<Component {...pageProps} />
							</ChakraProvider>
						</StudentProvider>
					</FacultyProvider>
				</AdminProvider>
			</AuthProvider>
		</ApolloProvider>
	);
}
