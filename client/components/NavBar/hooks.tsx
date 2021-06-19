import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "context/auth";

type NavBarArgs = {
	pastapp?: Boolean;
};

type NavBarReturn = {
	profileOnClick: () => void;
	remindersOnClick: () => void;
	logoutOnClick: () => void;
	selected: Boolean;
};

export const useNavBar = ({ pastapp }: NavBarArgs): NavBarReturn => {
	const [selected, setSelected] = useState(pastapp);

	const router = useRouter();
	const { logout } = useContext(AuthContext);

	useEffect(() => {
		setSelected(pastapp);
	}, [pastapp]);

	const profileOnClick = () => {
		router.push("/profile");
	};

	const remindersOnClick = () => {
		router.push("/reminders");
	};

	const logoutOnClick = () => {
		logout();
		router.replace("/login");
	};

	return {
		profileOnClick,
		remindersOnClick,
		logoutOnClick,
		selected,
	};
};
