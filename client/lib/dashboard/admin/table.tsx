import {
	Thead,
	Tbody,
	Tr,
	Th,
	Popover,
	PopoverTrigger,
	Button,
	PopoverBody,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverHeader,
	Select,
} from "@chakra-ui/react";
import AdminTableRow from "./tableRow";
import { AdminDashboardTable } from "./adminDashboard.styled";

const AdminTable = ({ lorApplications }) => {
	return (
		<>
			{/* <Popover>
				<PopoverTrigger>
					<Button>Trigger</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton />
					<PopoverHeader>Confirmation!</PopoverHeader>
					<PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
					<Select>
						<option value="">hi</option> <option value="">hi</option> <option value="">hi</option>{" "}
						<option value="">hi</option> <option value="">hi</option>
					</Select>
				</PopoverContent>
			</Popover> */}
			<AdminDashboardTable>
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
					{lorApplications &&
						lorApplications.map((lor, index) => {
							return <AdminTableRow lor={lor} key={lor.id} index={index} />;
						})}
				</Tbody>
			</AdminDashboardTable>
		</>
	);
};

export default AdminTable;
