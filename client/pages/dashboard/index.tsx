import { useContext, useEffect } from "react";
import { AuthContext } from "context/auth";
import FacultyDashboard from "../../lib/dashboard/faculty";
import StudentDashboard from "../../lib/dashboard/student";

const index = () => {
	const { user } = useContext(AuthContext);
	useEffect(() => {
		console.log("Current User: ", user);
	}, [user]);
	return <>{user?.userType === "FACULTY" ? <FacultyDashboard /> : <StudentDashboard />}</>;
};

export default index;
