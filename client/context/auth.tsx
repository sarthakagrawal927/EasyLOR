import React, { useReducer, createContext, Reducer } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { UserReturn } from "../entities/types.graphql";

type CurrentUser = {
	id: string;
	email: string;
	userType: "STUDENT" | "FACULTY";
};
type PayloadData = CurrentUser & JwtPayload;

const getDecodedUser = (): CurrentUser | null => {
	if (typeof window !== "undefined" && window.localStorage.getItem("jwtToken")) {
		const decodedToken = jwtDecode<PayloadData>(window.localStorage.getItem("jwtToken"));
		if (decodedToken.exp * 1000 < Date.now()) {
			window.localStorage.removeItem("jwtToken");
			return null;
		}
		return decodedToken;
	}
};

type AuthContextType = {
	user: CurrentUser | null;
	login?: (userData: UserReturn) => void;
	logout?: () => void;
};

type Action = {
	type: "LOGIN" | "LOGOUT";
};

const initialState: AuthContextType = {
	user: getDecodedUser() ?? null,
};

const AuthContext = createContext<AuthContextType>({
	user: getDecodedUser() ?? null,
});

function authReducer(state: AuthContextType, action: Action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: getDecodedUser(),
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
	const [state, dispatch] = useReducer<Reducer<AuthContextType, Action>>(authReducer, initialState);

	function login(userData: UserReturn) {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("jwtToken", userData.token);
			dispatch({ type: "LOGIN" });
		}
	}

	function logout() {
		if (typeof window !== "undefined") {
			dispatch({ type: "LOGOUT" });
			window.localStorage.removeItem("jwtToken");
		}
	}
	return <AuthContext.Provider value={{ user: state?.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
