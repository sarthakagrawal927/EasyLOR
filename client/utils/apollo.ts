import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { useMemo } from "react";

function createApolloClient() {
	return new ApolloClient({
		link: new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_API }),
		cache: new InMemoryCache(),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: "cache-and-network",
			},
		},
	});
}

export function useApollo() {
	const client = useMemo(() => createApolloClient(), []);
	return client;
}
