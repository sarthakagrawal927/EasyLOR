import { Heading } from "@chakra-ui/react";
import NavBar from "components/NavBar/NavBar";
import { useFacultyDashboard, makeData } from "./hooks";
import { SmallTableContainer } from "../dashboard.styled";
import FacultyTable from "./table";

const FacultyDashboard = () => {
	const { faculty, loading } = useFacultyDashboard();
	const lorApplications = makeData(faculty);

	return (
		<>
			<NavBar user={faculty?.user} />
			{loading ? (
				<p>Loading...</p>
			) : (
				lorApplications &&
				lorApplications.length !== 0 && (
					<SmallTableContainer>
						<Heading>YOUR PENDING APPLICATIONS</Heading>
						<FacultyTable lorApplications={lorApplications} />
					</SmallTableContainer>
				)
			)}
		</>
	);
};

export default FacultyDashboard;
