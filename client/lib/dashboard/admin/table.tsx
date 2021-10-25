import { Thead, Tbody, Tr, Th, Text } from "@chakra-ui/react";
import AdminTableRow from "./tableRow";
import { DashboardTable } from "../dashboard.styled";

const AdminTable = ({ lorApplications, makeTableData }) => {
	const lorApplicationsData = makeTableData(lorApplications);
	return (
		<>
			{lorApplicationsData && lorApplicationsData.length !== 0 ? (
				<DashboardTable>
					<Thead>
						<Tr>
							<Th>Students</Th>
							<Th>Faculty</Th>
							<Th>University</Th>
							<Th>Course</Th>
							<Th>Scores</Th>
							<Th>Contact</Th>
							<Th>LOR</Th>
						</Tr>
					</Thead>
					<Tbody>
						{lorApplicationsData.map((lor, index: number) => {
							return <AdminTableRow lor={lor} key={lor.id} index={index} />;
						})}
					</Tbody>
				</DashboardTable>
			) : (
				<Text fontSize="xl" textAlign="center">
					No applications yet for the given filters, try changing the filter.
				</Text>
			)}
		</>
	);
};

export default AdminTable;
