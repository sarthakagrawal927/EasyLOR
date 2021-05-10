import React, { useReducer, createContext, useEffect } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { UserReturn } from "../entities/types.graphql";

type AuthState = {
	user: JwtPayload | null;
};

const initialState: AuthState = {
	user: null,
};

if (typeof window !== "undefined" && window.localStorage.getItem("jwtToken")) {
	const decodedToken = jwtDecode<JwtPayload>(window.localStorage.getItem("jwtToken"));
	if (decodedToken.exp * 1000 < Date.now()) {
		window.localStorage.removeItem("jwtToken");
	} else {
		initialState.user = decodedToken;
	}
}

type AuthContextType = {
	user: UserReturn;
	login: (userData: UserReturn) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
	user: null,
	login: userData => {},
	logout: () => {},
});

type Action = {
	type: "LOGIN" | "LOGOUT";
	payload?: UserReturn;
};

function authReducer(state: any, action: Action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};

		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
}

function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	function login(userData: UserReturn) {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("jwtToken", userData.token);
			dispatch({ type: "LOGIN", payload: userData });
		}
	}

	function logout() {
		if (typeof window !== "undefined") {
			dispatch({ type: "LOGOUT" });
			window.localStorage.removeItem("jwtToken");
		}
	}

	return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
