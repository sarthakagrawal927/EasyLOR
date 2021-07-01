import { Heading } from "@chakra-ui/react";
import NavBar from "components/NavBar/NavBar";
import { columns, useFacultyDashboard, makeData } from "./hooks";
import { DashboardContainer, Container } from "../dashboard.styled";
import Table from "../table";

const FacultyDashboard = () => {
	const { faculty, loading } = useFacultyDashboard();
	const data = makeData(faculty);

	return (
		<>
			<NavBar user={faculty?.user} />
			<DashboardContainer>
				{loading ? (
					<p>Loading...</p>
				) : (
					data &&
					data.length !== 0 && (
						<Container>
							{" "}
							<Heading>Application</Heading>
							<Table columns={columns} data={data} />
							{}
						</Container>
					)
				)}
			</DashboardContainer>
		</>
	);
};

export default FacultyDashboard;
