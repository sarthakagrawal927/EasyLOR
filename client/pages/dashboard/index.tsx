import FacultyDashboard from "../../components/Dashboard/FacultyDashboard";
import StudentDashboard from "../../components/Dashboard/StudentDashboard";

const index = () => {
	const userType = "student";
	return <>{userType === "faculty" ? <FacultyDashboard /> : <StudentDashboard />}</>;
};

export default index;
