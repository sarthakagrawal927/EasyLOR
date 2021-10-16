import { useContext } from "react";
import { AuthContext } from "context/auth";
import withAuth from "components/withAuth";
import FacultyDashboard from "../../lib/dashboard/faculty";
import StudentDashboard from "../../lib/dashboard/student";
import AdminDashboard from "../../lib/dashboard/admin";

const Dashboard = () => {
	const { user } = useContext(AuthContext);

	return (
		<>
			{(() => {
				switch (user?.userType) {
					// case "ADMIN":
					// 	return <AdminDashboard />;
					case "FACULTY":
						return <FacultyDashboard />;
					case "STUDENT":
						return <StudentDashboard />;
					default:
						return null;
				}
			})()}
		</>
	);
};

export default withAuth(Dashboard);
