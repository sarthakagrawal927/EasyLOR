import NavBar from "components/NavBar/NavBar";
import { useAdminDashboard } from "./hooks";
import AdminTable from "./table";
import { Container } from "./adminDashboard.styled";

const AdminDashboard = () => {
	const { admin, lorApplications, lorApplicationsLoading } = useAdminDashboard();
	return (
		<>
			<NavBar user={admin} />

			<Container>{!lorApplicationsLoading && <AdminTable lorApplications={lorApplications} />}</Container>
		</>
	);
};

export default AdminDashboard;
