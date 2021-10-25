import { Thead, Tbody, Tr, Th, Text } from "@chakra-ui/react";
import StudentTableRow from "./tableRow";
import { DashboardTable } from "../dashboard.styled";

const StudentTable = ({ lorApplications, handleStatusClick }) => {
	return (
		<>
			{lorApplications && lorApplications.length !== 0 ? (
				<DashboardTable>
					<Thead>
						<Tr>
							<Th>Faculty</Th>
							<Th>University</Th>
							<Th>Course</Th>
							<Th>Status</Th>
						</Tr>
					</Thead>
					<Tbody>
						{lorApplications.map((lor, index: number) => {
							return (
								<StudentTableRow
									lor={lor}
									key={lor.id}
									index={index}
									handleStatusClick={handleStatusClick}
								/>
							);
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

export default StudentTable;
