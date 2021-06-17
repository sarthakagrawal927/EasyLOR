import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "context/auth";

const withAuth = <T extends object>(WrappedComponent: React.FC<T>) => {
	return (props: T) => {
		const router = useRouter();
		const { user } = useContext(AuthContext);
		const [authenticated, setAuthenticated] = useState(false);

		useEffect(() => {
			if (!user) {
				router.replace("/");
			} else {
				setAuthenticated(true);
			}
		}, []);

		if (authenticated) {
			return <WrappedComponent {...props} />;
		} else {
			return null;
		}
	};
};

export default withAuth;
