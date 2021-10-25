import { Thead, Tbody, Tr, Th, Text } from "@chakra-ui/react";
import FacultyTableRow from "./tableRow";
import { DashboardTable } from "../dashboard.styled";

const FacultyTable = ({ lorApplications }) => {
	return (
		<>
			{lorApplications && lorApplications.length !== 0 ? (
				<DashboardTable>
					<Thead>
						<Tr>
							<Th>Student</Th>
							<Th>University</Th>
							<Th>Course</Th>
							<Th />
						</Tr>
					</Thead>
					<Tbody>
						{lorApplications.map((lor, index: number) => {
							return <FacultyTableRow lor={lor} key={lor.id} index={index} />;
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

export default FacultyTable;
