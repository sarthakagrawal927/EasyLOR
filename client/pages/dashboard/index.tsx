import { useContext } from "react";
import { AuthContext } from "context/auth";
import withAuth from "components/withAuth";
import FacultyDashboard from "../../lib/dashboard/faculty";
import StudentDashboard from "../../lib/dashboard/student";

const Dashboard = () => {
	const { user } = useContext(AuthContext);

	return <>{user?.userType === "FACULTY" ? <FacultyDashboard /> : <StudentDashboard />}</>;
};

export default withAuth(Dashboard);
