import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "context/auth";

type NavBarArgs = {
	pastapp?: Boolean;
};

type NavBarReturn = {
	handleProfile: () => void;
	handleReminder: () => void;
	handleLogout: () => void;
	selected: Boolean;
};

export const useNavBar = ({ pastapp }: NavBarArgs): NavBarReturn => {
	const [selected, setSelected] = useState(pastapp);

	const router = useRouter();
	const { user, logout } = useContext(AuthContext);

	useEffect(() => {
		setSelected(pastapp);
	}, [pastapp]);

	const handleProfile = () => {
		const route = user.userType === "FACULTY" ? "/faculty/profile" : "/profile";
		router.push(route);
	};

	const handleReminder = () => {
		router.push("/reminders");
	};

	const handleLogout = () => {
		logout();
		router.replace("/login");
	};

	return {
		handleProfile,
		handleReminder,
		handleLogout,
		selected,
	};
};
