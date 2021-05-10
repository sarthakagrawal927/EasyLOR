import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo, useEffect } from "react";

function createApolloClient() {
	const httpLink = createHttpLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
	});

	const authLink = setContext(() => {
		let token = null;
		if (typeof window !== "undefined") {
			token = window.localStorage.getItem("jwtToken");
		}
		return {
			headers: {
				Authorization: token ? `Bearer ${token}` : "",
			},
		};
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
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
