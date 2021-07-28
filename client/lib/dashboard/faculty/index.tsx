import { Heading } from "@chakra-ui/react";
import NavBar from "components/NavBar/NavBar";
import { useFacultyDashboard, makeData } from "./hooks";
import { DashboardContainer, Container } from "../dashboard.styled";
import Table from "../table";
import Link from "next/link";

const FacultyDashboard = () => {
	const columns = [
		{
			Header: "Application No.",
			accessor: "applicationNo",
		},
		{
			Header: "Student",
			accessor: "name",
		},
		{
			Header: "Branch",
			accessor: "department",
		},
		{
			Header: "VIEW",
			accessor: "link",
			Cell: (e: any) => (
				<Link href={`viewApplication/${e.value}`}>
					<button>View</button>
				</Link>
			),
		},
	];
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
